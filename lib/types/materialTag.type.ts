import { Material } from "./material.type";
import { Tag } from "./tags.type";

export type MaterialTag = {
	materialId: string;
	material: Material;
	tagId: string;
	tag: Tag;
};
