import { ItemHome } from "../ItemHome/ItemHome";
function SectionList({ title, items }) {

    console.log('SectionList props:', { title, items });
    return (
        <div className="flex flex-col items-center justify-center w-1/3 gap-2 p-5">
            <p className="text-xl font-bold text-orange-500">{title}</p>
            <ul className="flex flex-col w-full gap-3 px-3 py-5 text-base font-light border border-orange-500 opa rounded-xl">
                {items && items.length > 0 ? (
                    items.map((item, index) => (
                        <ItemHome key={index} to={item.to}  name={item.label}/>
                    ))
                ) : (
                    <li>No hay elementos disponibles</li>
                )}
            </ul>
        </div>
    );
}

export { SectionList };