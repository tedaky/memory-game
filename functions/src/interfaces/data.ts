// eslint-disable-next-line no-unused-vars
import { IStatistic } from './statistics'

// eslint-disable-next-line max-len
export type FireStoreDocumentSnapshotData = FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
// type UserScoreKeys = `${'r' | 'h'}_co:${Count}_ma:${Match}_mo:${Mode}`
/**
 * The score data for the specified key
 */
export type Data = {
  /**
   * The score data
   */
  [key: string]: Score
  // [key in UserScoreKeys]: Score
}
/**
 * The user and score data
 */
export type UserData = Data & {
  /**
   * User ID
   */
  uid: string
}

/**
 * The latest score and count
 */
export interface Score {
  /**
   * Count of existing scores (max: 10)
   */
  count: number
  /**
   * The score data
   */
  score: IStatistic
}
