export enum OptionGroupType {
	General = 0, // 一般選項，可多選
	Single = 1, // 單選（radio button 類型）
}

export const OptionGroupTypeLabel: Record<OptionGroupType, string> = {
	[OptionGroupType.General]: "一般選項（可多選）",
	[OptionGroupType.Single]: "單選（Radio 類型）",
};

export const OptionGroupTypeOptions = Object.values(OptionGroupType)
	.filter((v) => typeof v === "number") 
	.map((value) => ({
		value: value.toString(),
		label: OptionGroupTypeLabel[value as OptionGroupType],
	}));
