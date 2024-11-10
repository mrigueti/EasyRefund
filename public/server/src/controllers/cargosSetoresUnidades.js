import { db } from '../db.js';

export const getCargosSetoresUnidades = (req, res) => {
  const query = `
    SELECT 
      c.nome_cargo AS Cargo,
      s.nome_setor AS Setor,
      u.nome_unidade AS Unidade
    FROM 
      cargos c
    JOIN 
      setores s ON c.id_setor = s.id_setor
    JOIN 
      setores_unidades su ON s.id_setor = su.id_setor
    JOIN 
      unidades u ON su.id_unidade = u.id_unidade
    GROUP BY 
      c.nome_cargo, s.nome_setor, u.nome_unidade;
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar cargos, setores e unidades:', err);
      return res.status(500).json({ error: 'Erro ao buscar dados' });
    }

    const cargosSetoresUnidades = Array.isArray(results) ? results : [];
    console.log(results);
    
    res.json(cargosSetoresUnidades);
  });
};
