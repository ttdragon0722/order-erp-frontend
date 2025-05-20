const ClassificationBlock = ({ id, name, hasStock }: { id: string, name: string, hasStock: boolean }) => {
    return <a href={"#" + id} className="px-2 py-1 h-fit bg-white rounded-lg shadow-sm hover:bg-black hover:text-white transition-colors duration-300">
        {name}
    </a>
}

export default ClassificationBlock;