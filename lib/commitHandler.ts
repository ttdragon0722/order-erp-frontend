type RowData = { id: string };

class CommitHandler<T extends RowData> {
    private originalSource!: T[];
    private change!: Record<string, Partial<T>>;

    constructor() { }

    register(source: T[]) {
        this.originalSource = [...source]; // 複製原始資料
        this.change = {};
    }

    public get source() {
        return this.originalSource;
    }

    // 更新某個 ID 下的欄位
    update(id: string, field: keyof T, newValue: any) {
        const originalItem = this.originalSource.find((item) => item.id === id);

        if (!originalItem) {
            console.warn(`ID ${id} 不存在於 source`);
            return;
        }

        const originalValue = originalItem[field];

        // 如果新值與原始值相同，則移除變更紀錄
        if (newValue === originalValue) {
            if (this.change[id]) {
                delete this.change[id][field];

                // 如果該 ID 下已無任何變更，則刪除該 ID 的變更紀錄
                if (Object.keys(this.change[id]).length === 0) {
                    delete this.change[id];
                }
            }
            return;
        }

        // 若變更與原始值不同，則記錄變更
        if (!this.change[id]) {
            this.change[id] = {};
        }
        this.change[id][field] = newValue;
    }

    // 應用變更
    commit() {
        this.originalSource = this.originalSource.map((item) => {
            if (this.change[item.id]) {
                return { ...item, ...this.change[item.id] };
            }
            return item;
        });

        // 清空變更紀錄
        this.change = {};
    }

    // 取得目前的資料狀態
    getData() {
        return this.originalSource;
    }

    // 取得變更紀錄
    getChanges() {
        return this.change;
    }
}

export default CommitHandler;