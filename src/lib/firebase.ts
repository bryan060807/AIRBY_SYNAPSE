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
  const releases: Release[] = [];

  try {
    const projectsSnapshot = await db.collection('discography_projects').get();
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
  } catch (error: any) {
    if (error.code !== 5) throw error; // 5 = NOT_FOUND, rethrow other errors
    console.warn("Collection 'discography_projects' not found. It may not have been created yet.");
  }

  try {
    const singlesSnapshot = await db.collection('discography_singles').get();
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
  } catch (error: any) {
    if (error.code !== 5) throw error; // 5 = NOT_FOUND, rethrow other errors
    console.warn("Collection 'discography_singles' not found. It may not have been created yet.");
  }


  // Sort by release date descending
  releases.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

  return releases;
}


export async function getReleaseById(id: string): Promise<Release | undefined> {
    // We have to check both collections
    try {
        const docSnap = await db.collection('discography_projects').doc(id).get();
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
    } catch (error: any) {
        if (error.code !== 5) { // NOT_FOUND
            throw error;
        }
        // If collection not found, just continue to the next one.
    }

    try {
        const docSnap = await db.collection('discography_singles').doc(id).get();
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
    } catch (error: any) {
        if (error.code !== 5) { // NOT_FOUND
            throw error;
        }
    }

    return undefined;
}
