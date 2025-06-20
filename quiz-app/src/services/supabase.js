import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lybhujonnukepvsdiwrm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Ymh1am9ubnVrZXB2c2Rpd3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNzI3MjEsImV4cCI6MjA2NTg0ODcyMX0.XbiClk-qFcVPP8ehqo-QT3EcDtzBqXu9Qg5h1Z7NhiQ';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Create or update user profile
export async function createUserProfile(nickname) {
    const userId = crypto.randomUUID();
    const { data, error } = await supabase
        .from('ratings')
        .insert([{ user_id: userId, nickname, points: 0 }])
        .select();
    if (error) throw error;
    return data[0];
}

// Get user profile by user_id
export async function getUserProfile(userId) {
    const { data, error } = await supabase
        .from('ratings')
        .select('*')
        .eq('user_id', userId)
        .single();
    if (error) throw error;
    return data;
}

// Update user points
export async function updateUserPoints(userId, points) {
    const { data, error } = await supabase
        .from('ratings')
        .update({ points })
        .eq('user_id', userId)
        .select();
    if (error) throw error;
    return data[0];
}


export async function getQuizzes() {
    console.log('supabase.js: Fetching quizzes');
    const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        console.error('supabase.js: Error fetching quizzes:', error);
        throw error;
    }
    console.log('supabase.js: Fetched quizzes:', data);
    return data;
}

// Get a quiz by ID
export async function getQuizById(quizId) {
    const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .single();
    if (error) throw error;
    return data;
}

export async function getRatings() {
    const { data, error } = await supabase
        .from('ratings')
        .select('nickname, points')
        .order('points', { ascending: false });
    if (error) throw error;
    return data;
}

export async function createQuiz(title, questions) {
    console.log('supabase.js: Creating quiz with title:', title, 'questions:', questions);
    const { data, error } = await supabase
        .from('quizzes')
        .insert([{ title, questions, image_url: null }])
        .select()
        .single();
    if (error) {
        console.error('supabase.js: Error creating quiz:', error);
        throw error;
    }
    console.log('supabase.js: Created quiz:', data);
    return data;
}

export async function uploadQuizImage(file) {
    console.log('supabase.js: Uploading image:', file.name);
    const fileName = `quiz-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
        .from('quiz-images')
        .upload(fileName, file);
    if (error) {
        console.error('supabase.js: Error uploading image:', error);
        throw error;
    }
    console.log('supabase.js: Image uploaded:', fileName);
    const { publicUrl } = supabase.storage
        .from('quiz-images')
        .getPublicUrl(fileName);
    console.log('supabase.js: Public URL:', publicUrl);
    return publicUrl;
}