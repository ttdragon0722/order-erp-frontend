import { Option } from "./option.type";
import { TypeEntity } from "./typeEntity.type";

export type TypeOption = {
	typeId: string;
	type: TypeEntity;
	optionId: string;
	option: Option;
};
