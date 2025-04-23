export const SubmitButton = ({ label }: { label: string }) => {
    return <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
    >
        {label}
    </button>
}