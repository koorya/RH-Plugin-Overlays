export type Heat = {
  id: number;
  displayname: string;
  name: string;
  auto_name: string;
  class_id: number;
  group_id: number;
  order: null;
  status: number;
  auto_frequency: boolean;
  active: boolean;
  coop_best_time: string;
  coop_num_laps: number;
  next_round: number;
  slots: (
    | {
        id: number;
        node_index: number;
        pilot_id: number;
        method: number;
        seed_rank: number;
        seed_id: null;
      }
    | {
        id: number;
        node_index: number;
        pilot_id: null;
        method: number;
        seed_rank: null;
        seed_id: null;
      }
  )[];
  dynamic: boolean;
  locked: boolean;
};
