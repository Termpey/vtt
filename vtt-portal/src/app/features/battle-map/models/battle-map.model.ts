export interface BattleMap {
    id: number
    name: string
    scrollTopRatio: number
	scrollLeftRatio: number
	zoomRatio: number
	storagePath: string
	createdAt: Date
	updatedAt: Date
	deletedAt?: Date
}

export interface NewBattleMap {
    file: File
    name: string
    scrollTopRatio: string
    scrollLeftRatio: string
    zoomRatio: string
}