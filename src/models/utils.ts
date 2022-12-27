import * as firebase from 'firebase/app';

export function defined(obj) {
  return obj !== undefined;
}

export function convertToDate(data) {
  if (typeof data === 'string') {
    return new Date(data);
  }

  if (data instanceof firebase.firestore.Timestamp) {
    return data.toDate();
  }

  if (data && typeof data === 'object' && !!data.nanoseconds && !!data.seconds) {
    return new Date(data.seconds * 1000);
  }

  return null;
}
