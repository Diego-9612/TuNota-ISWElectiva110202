from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from roles.models import Role
from roles.serializers import RoleSerializer
from users.models import User, UserHasRoles
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_by_id(request, id_user):
    try:
        user = User.objects.get(id=id_user)
    except User.DoesNotExist:
        return Response(
            {
                "message": "El usuario no existe",
                "statusCode": status.HTTP_404_NOT_FOUND
            },
            status=status.HTTP_404_NOT_FOUND
        )

    roles = Role.objects.filter(userhasroles__id_user=user)
    roles_serializer = RoleSerializer(roles, many=True)
    user_data = {
        "id": user.id,
        "name": user.name,
        "lastname": user.lastname,
        "email": user.email,
        "phone": user.phone,
        "notification_token": user.notification_token,
        "roles": roles_serializer.data,
    }
    return Response(user_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_user(request):
    users = User.objects.all()
    all_users_data = []

    for user in users:
        roles = Role.objects.filter(userhasroles__id_user=user)
        roles_serializer = RoleSerializer(roles, many=True)
        user_data = {
            "id": user.id,
            "name": user.name,
            "lastname": user.lastname,
            "email": user.email,
            "phone": user.phone,
            "notification_token": user.notification_token,
            "roles": roles_serializer.data,
        }
        all_users_data.append(user_data)

    return Response(all_users_data, status=status.HTTP_200_OK)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update(request, id_user):
    if str(request.user.id) != str(id_user):
        return Response(
            {
                "message": "No tienes permiso para actualizar este usuario",
                "statusCode": status.HTTP_403_FORBIDDEN,
            },
            status=status.HTTP_403_FORBIDDEN
        )
    try:
        user = User.objects.get(id=id_user)
    except User.DoesNotExist:
        return Response(
            {
                "message": "El usuario no existe",
                "statusCode": status.HTTP_404_NOT_FOUND,
            },
            status=status.HTTP_404_NOT_FOUND
        )

    name = request.data.get('name', None)
    lastname = request.data.get('lastname', None)
    phone = request.data.get('phone', None)


    if name is None and lastname is None and phone is None:
        return Response(
            {
                "message": "No se enviaron datos para actualizar",
                "statusCode": status.HTTP_400_BAD_REQUEST,
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if name is not None:
        user.name = name

    if lastname is not None:
        user.lastname = lastname

    if phone is not None:
        user.phone = phone

    user.save()

    roles = Role.objects.filter(userhasroles__id_user=user)
    roles_serializer = RoleSerializer(roles, many=True)
    user_data = {
        "id": user.id,
        "name": user.name,
        "lastname": user.lastname,
        "email": user.email,
        "phone": user.phone,
        "notification_token": user.notification_token,
        "roles": roles_serializer.data,
    }
    return Response(user_data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, id_user):
    try:
        target_user = User.objects.get(id=id_user)
    except User.DoesNotExist:
        return Response(
            {"message": "El usuario no existe", "statusCode": status.HTTP_404_NOT_FOUND},
            status=status.HTTP_404_NOT_FOUND
        )

    # Obtener roles del usuario autenticado
    user_roles = list(request.user.roles.values_list('id', flat=True))

    # Si es ADMIN, puede eliminar cualquier usuario
    if 'ADMIN' in user_roles:
        target_user.delete()
        return Response({"message": "Usuario eliminado correctamente"}, status=status.HTTP_200_OK)

    
    if 'STUDENT' in user_roles or 'TEACHER' in user_roles:
        if str(request.user.id) == str(id_user):
            target_user.delete()
            return Response({"message": "Cuenta eliminada correctamente"}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "No tienes permiso para eliminar este usuario", "statusCode": status.HTTP_403_FORBIDDEN},
                status=status.HTTP_403_FORBIDDEN
            )

    
    return Response(
        {"message": "No tienes permiso para realizar esta acción", "statusCode": status.HTTP_403_FORBIDDEN},
        status=status.HTTP_403_FORBIDDEN
    )


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_user(request, id_user):
    try:
        target_user = User.objects.get(id=id_user)
    except User.DoesNotExist:
        return Response(
            {"message": "El usuario no existe", "statusCode": status.HTTP_404_NOT_FOUND},
            status=status.HTTP_404_NOT_FOUND
        )
    
    user_roles = list(request.user.roles.values_list('id', flat=True))

    if 'ADMIN' in user_roles or str(request.user.id) == str(id_user):
        # Campos editables
        editable_fields = ['name', 'lastname', 'email', 'username']
        for field in editable_fields:
            if field in request.data:
                setattr(target_user, field, request.data[field])
        target_user.save()
        return Response({"message": "Usuario actualizado correctamente"}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"message": "No tienes permiso para editar este usuario", "statusCode": status.HTTP_403_FORBIDDEN},
            status=status.HTTP_403_FORBIDDEN
        )