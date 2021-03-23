import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { FileUpload } from './file-upload.model';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads';
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  async pushFileToStorage(fileUpload: FileUpload) {
    // const uuid = this.uuidv4();
    const filePath = `${this.basePath}/${fileUpload.id}/${fileUpload.file.name}`;
    //const storageRef = this.storage.ref(filePath);
    const uploadTask = await this.storage.upload(filePath, fileUpload.file);

    return await uploadTask.ref.getDownloadURL().then((downloadURL) => {
      fileUpload.url = downloadURL;
      fileUpload.name = fileUpload.file.name;
      this.saveFileData(fileUpload);
      return fileUpload;
    });
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       storageRef.getDownloadURL().subscribe((downloadURL) => {
    //         fileUpload.url = downloadURL;
    //         fileUpload.name = fileUpload.file.name;

    //         this.saveFileData(fileUpload);
    //       });
    //     })
    //   )
    //   .subscribe();
    // return uploadTask.percentageChanges();
  }

  getFiles(numberItems, userFolder): AngularFireList<FileUpload> {
    // this.basePath + '/' + userFolder

    return this.db.list(this.basePath + '/' + userFolder, (ref) => {
      return ref.limitToLast(numberItems);
    });
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key, fileUpload.id)
      .then(() => {
        this.deleteFileStorage(fileUpload.id + '/' + fileUpload.name);
      })
      .catch((error) => console.log(error));
  }
  private deleteFileStorage(name: string) {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  private deleteFileDatabase(key: string, userID) {
    return this.db.list(this.basePath + '/' + userID).remove(key);
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath + '/' + fileUpload.id).push(fileUpload);
  }
}
