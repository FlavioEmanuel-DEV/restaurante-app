import express from 'express'
import { createClient } from '@supabase/supabase-js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()  // Adiciona esta linha
app.use(cors())       // Habilita CORS
app.use(express.json()) // Para parsing de JSON

// Use a URL correta do Supabase (deve começar com https://)
const supabaseUrl = 'https://wvxgsukilnvngcvbqhxp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2eGdzdWtpbG52bmdjdmJxaHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNzExNzUsImV4cCI6MjA1NTY0NzE3NX0.iktvTfIx8WeCy5-BzoJtnlRc_ht2ngJGQ3inAnRdtd8'

const supabase = createClient(supabaseUrl, supabaseKey)

app.get('/reservas', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reservas')
            .select('*')
        
        if (error) throw error
        
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.post('/reservas', async (req, res) => {
    const { nome, data, pessoas } = req.body;
    const { data: result, error } = await supabase
    
      .from('reservas')
      .insert([{ nome, data, pessoas }])
      .select();
  
    if (error) return res.status(500).json({ error: error.message });
    res.json(result);
  });

// Adiciona o listen do servidor
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})