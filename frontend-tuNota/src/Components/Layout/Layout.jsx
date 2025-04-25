function Layout({children}){
    return(
        <div className="flex flex-col items-center justify-center mt-32">
            {children}
        </div>
    );

}

export {Layout}