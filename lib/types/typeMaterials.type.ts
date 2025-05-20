import { Material } from "./material.type";
import { TypeEntity } from "./typeEntity.type";

export interface TypeMaterials {
    typeEntityId: string;
    typeEntity?: TypeEntity;  // 可以選擇性地加入完整的 TypeEntity 資料
    materialId: string;
    material?: Material;      // 可以選擇性地加入完整的 Material 資料
}