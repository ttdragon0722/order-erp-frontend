import { ColorName } from "../../config/colorSet";
import { MaterialTag } from "./materialTag.type";
import { ProductTag } from "./productTag.type";

export type Tag = {
	id: string;
	name: string;
	color: number;
	enable: boolean;
	materialTags?: MaterialTag[];
	productTags?: ProductTag[];
};
