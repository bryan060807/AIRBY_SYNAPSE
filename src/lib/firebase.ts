'use server';

import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { Release } from './types';

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }
  return initializeApp();
}

const db = getFirestore(getAdminApp());

export async function getDiscography(): Promise<Release[]> {
  const projectsSnapshot = await db.collection('discography_projects').get();
  const singlesSnapshot = await db.collection('discography_singles').get();

  const releases: Release[] = [];

  projectsSnapshot.forEach(doc => {
    const data = doc.data();
    releases.push({
      id: doc.id,
      title: data.title,
      releaseDate: data.release_date,
      genre: data.genre,
      description: data.highlights, // mapping highlights to description
      status: data.status,
      artist: 'AIBRY', // Assuming artist is always AIBRY
      moodKeywords: [], // Not available in this collection
      uniqueSellingPoints: '', // Not available
      category: 'Album'
    });
  });

  singlesSnapshot.forEach(doc => {
    const data = doc.data();
    releases.push({
      id: doc.id,
      title: data.title,
      releaseDate: data.release_date,
      genre: data.genre,
      category: data.category,
      description: '', // Not available
      status: 'Released', // Assuming singles are released
      artist: 'AIBRY',
      moodKeywords: [],
      uniqueSellingPoints: '',
    });
  });

  // Sort by release date descending
  releases.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

  return releases;
}


export async function getReleaseById(id: string): Promise<Release | undefined> {
    // We have to check both collections
    let docSnap = await db.collection('discography_projects').doc(id).get();
    if (docSnap.exists) {
        const data = docSnap.data()!;
        return {
            id: docSnap.id,
            title: data.title,
            releaseDate: data.release_date,
            genre: data.genre,
            description: data.highlights,
            status: data.status as Release['status'],
            artist: 'AIBRY',
            moodKeywords: [],
            uniqueSellingPoints: '',
            category: 'Album'
        };
    }

    docSnap = await db.collection('discography_singles').doc(id).get();
    if (docSnap.exists) {
        const data = docSnap.data()!;
        return {
            id: docSnap.id,
            title: data.title,
            releaseDate: data.release_date,
            genre: data.genre,
            category: data.category,
            description: '',
            status: 'Released',
            artist: 'AIBRY',
            moodKeywords: [],
            uniqueSellingPoints: '',
        };
    }

    return undefined;
}
