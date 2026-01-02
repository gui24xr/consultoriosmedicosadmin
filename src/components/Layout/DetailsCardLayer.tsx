export default function DetailsCardLayer({ detailsData }: { detailsData: any}) {


    const getSectionItemsComponent = (section: any) => {
        if (section.items.length === 0) {
            return <div className="text-sm text-gray-500 italic">{section.noItemsMessage}</div>
        }

        if (section.type === "key-value") {
            return section.items.map((item: any) => (
                <div key={item.title} className="flex flex-col gap-1 py-2 border-b border-gray-100">
                    <span className="text-sm font-semibold text-gray-900">{item.title}</span>
                    <span className="text-sm text-gray-900">{item.value}</span>
                </div>
            ))
        } else
            if (section.type === "list") {
                return (
                    <ul className="space-y-2">
                        {section.items.map((item: any) => (
                            <li key={item} className="flex items-center py-1">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                                <span className="text-sm text-gray-900">{item}</span>
                            </li>
                        ))}
                    </ul>
                )
            }
    }

    return (
        <div className="bg-white shadow-lg border border-gray-200 min-h-screen overflow-y-auto">
            {/* Content */}
            <div className="flex flex-col gap-8 p-4">
                <div className="flex border-b-2 border-blue-200 items-start space-x-4">
                    {/* Avatar/Icono + nombre */}
                    {detailsData.showHeaderIcon &&
                    <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                        {detailsData.headerIcon}
                    </div>}
                    <span className="text-4xl font-semibold text-gray-800">{detailsData.detailsTitle}</span>

                </div>
                {/*Aca ira un panel de botones para editar, eliminar, etc*/}
                



                {/* Secciones */}
                <div className="grid grid-cols-1 gap-4">
                    {detailsData.sections.map((section: any) => (
                        <div key={section.title} className="space-y-2 bg-white">
                            <h3 className={`text-xl font-semibold text-gray-800 border-b pb-2 flex items-center ${section.borderColor}`}>
                                {section.icon}
                                {section.title}
                            </h3>
                            {getSectionItemsComponent(section)}
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}