import {pool} from '../db.js'

export const getCorte = async (req, res) => {
    try {
        
        const [rows] = await pool.query('SELECT * FROM cortexmantenimiento')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }    
}

export const getCortes = async (req, res) => {    
    try {
        const [rows] = await pool.query('SELECT * FROM cortexmantenimiento WHERE IN_ID_CORTXMAN = ? ', [req.params.id])    
        if(rows.length <= 0 ) return res.status(404).json({
            message: 'Corte not fount'
        })
        res.json(rows[0])
    } catch (error) {
        return  res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


export const createCorte = async (req, res) => {
    const {DT_FECHA,VC_DISTRITO,VC_PROVINCIA,VC_DEPARTAMENTO,VC_COMENTARIO} = req.body

    try {           
    const [rows] = await pool.query('INSERT INTO cortexmantenimiento (DT_FECHA, VC_DISTRITO, VC_PROVINCIA, VC_DEPARTAMENTO, VC_COMENTARIO) VALUES(?, ?, ?, ?, ?)', [DT_FECHA,VC_DISTRITO,VC_PROVINCIA,VC_DEPARTAMENTO,VC_COMENTARIO] )
    res.send({
        IN_ID_CORTXMAN: rows.insertId,
        DT_FECHA, 
        VC_DISTRITO, 
        VC_PROVINCIA, 
        VC_DEPARTAMENTO, 
        VC_COMENTARIO
    })
    } catch (error) {
        return res.status(500).json({
            message:  'Something goes wrong'
        })
    }
}

export const deleteCorte = async(req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM cortexmantenimiento WHERE IN_ID_CORTXMAN = ?', [req.params.id]) 
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'corte not fount'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message:  'Something goes wrong'
        })
    }
}


export const updateCorte = async (req, res) => {
    const {id} = req.params
    const { DT_FECHA, VC_DISTRITO, VC_PROVINCIA, VC_DEPARTAMENTO, VC_COMENTARIO} = req.body
       
    try {
        const [result] = await pool.query('UPDATE cortexmantenimiento SET DT_FECHA = IFNULL(?, DT_FECHA), VC_DISTRITO =  IFNULL(?, VC_DISTRITO), VC_PROVINCIA =   IFNULL(?, VC_PROVINCIA), VC_DEPARTAMENTO = IFNULL(?, VC_DEPARTAMENTO), VC_COMENTARIO = IFNULL(?, VC_COMENTARIO) WHERE IN_ID_CORTXMAN = ?', [DT_FECHA, VC_DISTRITO, VC_PROVINCIA, VC_DEPARTAMENTO, VC_COMENTARIO, id])
    
        console.log(result)
    
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Corte not found'
        })
    
        const [rows] = await pool.query('SELECT * FROM cortexmantenimiento WHERE IN_ID_CORTXMAN = ?', [id])
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message:  'Something goes wrong'
        })
    }
}

