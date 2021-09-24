import { Post } from "../post";
import { Comment } from "../comment";
import { Profile } from "../profile";

export interface StoreInterface {
  clearStore?: () => void;
  destroyReferences?: ((entityId: string) => unknown) | ((entity: Post | Comment | Profile) => unknown);
}
