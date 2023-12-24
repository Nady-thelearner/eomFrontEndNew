import { Injectable } from "@angular/core";
import { IDBPDatabase, openDB } from "idb";

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbName = 'myDatabase';
  private version = 3;
  private storeName1 = 'EcommApp';
  private storeName2 = 'EcommmNEw';

  async openDatabase(): Promise<IDBPDatabase> {
    return await openDB(this.dbName, this.version, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // Check if the object store already exists before creating it
        if (!db.objectStoreNames.contains('EcommApp')) {
          console.log("Creating object store 'EcommApp'");
          db.createObjectStore('EcommApp', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }

        // Create another object store if it doesn't exist
        if (!db.objectStoreNames.contains('EcommmNEw')) {
          console.log("Creating object store 'EcommmNEw'");
          db.createObjectStore('EcommmNEw', {
            keyPath: 'ID',
            autoIncrement: true,
          });
        }
      },
    });
  }

  // Rest of your code...

  async addItem(item: any): Promise<void> {
    const db = await this.openDatabase();
    const tx = db.transaction(this.storeName1, 'readwrite');
    const store = tx.objectStore(this.storeName1);
    await store.add(item);
    await tx.done;
  }

  async addItem2(item: any): Promise<void> {
    const db = await this.openDatabase();
    const tx = db.transaction(this.storeName2, 'readwrite');
    const store = tx.objectStore(this.storeName2);
    await store.add(item);
    await tx.done;
  }

  // Rest of your code...

  async updateItem(updatedItem: any): Promise<void> {
    const db = await this.openDatabase();
    const tx = db.transaction(this.storeName1, 'readwrite');
    const store = tx.objectStore(this.storeName1);

    // Assuming 'id' is the key property in your data
    const itemId = 5; // Replace with the actual ID you're interested in
    const storedItem = await store.get(itemId);
    // const existingItem = await store.get(updatedItem.id);

    if (storedItem) {
      // Update properties of the existing item
      Object.assign(storedItem, updatedItem);

      // Put the updated item back into the store
      await store.put(storedItem);
    }

    await tx.done;
  }

  async deleteItem(itemId: number): Promise<void> {
    const db = await this.openDatabase();
    const tx = db.transaction(this.storeName1, 'readwrite');
    const store = tx.objectStore(this.storeName1);

    // Delete the item based on its ID
    await store.delete(itemId);

    await tx.done;
  }

  async getAllItems(): Promise<any[]> {
    const db = await this.openDatabase();
    const tx = db.transaction(this.storeName1, 'readonly');
    const store = tx.objectStore(this.storeName1);

    // Use getAll() to fetch all items from the store
    return store.getAll();
    /*const itemId = 1; // Replace with the actual ID you're interested in
const storedItem = await store.get(itemId);

if (storedItem) {
  const uniqueId = storedItem.id;
  console.log(`The unique ID of the stored item is: ${uniqueId}`);
} else {
  console.log(`Item with ID ${itemId} not found.`);
} */
  }

  async getOneItem(): Promise<any[]> {
    const db = await this.openDatabase();
    const tx = db.transaction(this.storeName1, 'readonly');
    const store = tx.objectStore(this.storeName1);

    // Use getAll() to fetch all items from the store

    const itemId = 1; // Replace with the actual ID you're interested in
    const storedItem = await store.get(itemId);

    if (storedItem) {
      const uniqueId = storedItem.id;
      return storedItem;
      console.log(`The unique ID of the stored item is: ${uniqueId}`);
    } else {
      console.log(`Item with ID ${itemId} not found.`);
      return null;
    }
  }
}

