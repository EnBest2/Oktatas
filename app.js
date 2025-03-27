
// Supabase inicializálás
const SUPABASE_URL = 'https://ejrucgtmgiwpfexbvwxa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcnVjZ3RtZ2l3cGZleGJ2d3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNzEzMTYsImV4cCI6MjA1ODY0NzMxNn0.1J_eWcCSeJLdSNDDLNksr6TaQc3wCHKBRVc3a5pTnJQ';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let selectedCategory = '';

// Kategória választás
function selectCategory(category) {
  selectedCategory = category;
  alert('Kategória kiválasztva: ' + category);
}

// Feltöltés
async function handleUpload() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file || !selectedCategory) {
    alert('Válassz kategóriát és fájlt is!');
    return;
  }

  const { data, error } = await supabase.storage
    .from('adatok')  // <-- frissített bucket név
    .upload(`${selectedCategory}/${file.name}`, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    alert('Hiba a feltöltésnél: ' + error.message);
  } else {
    alert('Sikeres feltöltés: ' + file.name);
  }
}
