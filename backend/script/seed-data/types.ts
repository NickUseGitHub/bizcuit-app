export interface Seedable {
  seed: () => Promise<void>;
}
