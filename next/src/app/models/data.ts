//         "sports": sports,
//         "opponent": opponent,
//         "date": date,
//         "start_time": start_time,
//         "end_time": end_time,
//         "status": status,
//         "memo": memo,

export interface Data {
    id: number;
    sports: string;
    opponent: string;
    date: string;
    start_time: string;
    end_time: string;
    place: string;
    status: string;
    memo: string;
    required: number[];
}