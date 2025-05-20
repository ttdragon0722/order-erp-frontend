import { SubmitButton } from "./Button";
import { Input } from "./Input";

const AddForm = ({
    label, handleSubmit, newVal, handleNewVal, tagInput
}: {
    label: string
    handleSubmit: (e: React.FormEvent) => Promise<void>,
    newVal: string,
    handleNewVal: (e: React.ChangeEvent<HTMLInputElement>) => void,
    tagInput?: React.ReactNode
}) => {

    return <form onSubmit={handleSubmit} className="mt-4 w-1/3 flex-col gap-2">
        <div className="flex gap-2">
            <Input required placeholder={label} value={newVal} onChange={handleNewVal} />
            <SubmitButton label="新增" />
        </div>
        {tagInput}
    </form>
}

export default AddForm;