/**
 * Delete the Collection
 *
 * @param {FirebaseFirestore.Firestore} db the firestore database
 * @param {string} collectionPath the path of the collection
 * @param {number} batchSize the size to delete at one time
 */
export async function deleteCollection(
  db: FirebaseFirestore.Firestore,
  collectionPath: string,
  batchSize: number
): Promise<void> {
  const collectionRef = db.collection(collectionPath)
  const query = collectionRef.orderBy('__name__').limit(batchSize)

  return new Promise(
    (resolve: (value?: any) => void, reject: (reason?: any) => void): void => {
      deleteQueryBatch(db, query, resolve).catch(reject)
    }
  )
}

/**
 * Delete the Query Batch
 *
 * @param {FirebaseFirestore.Firestore} db the firestore database
 * @param {FirebaseFirestore.Query<FirebaseFirestore.DocumentData>} query
 * @param {()} resolve
 */
async function deleteQueryBatch(
  db: FirebaseFirestore.Firestore,
  query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
  resolve: (value?: any) => void
) {
  const snapshot = await query.get()

  const batchSize = snapshot.size
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve()
    return
  }

  // Delete documents in a batch
  const batch = db.batch()
  snapshot.docs.forEach(
    (
      // eslint-disable-next-line max-len
      doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
    ): void => {
      batch.delete(doc.ref)
    }
  )
  await batch.commit()

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick((): void => {
    deleteQueryBatch(db, query, resolve)
  })
}
