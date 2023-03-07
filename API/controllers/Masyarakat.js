import Masyarakat from "../models/MasyarakatModel.js";
import User from "../models/UserModel.js";
import argon2 from "argon2"

export const getMasyarakat = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Masyarakat.findAll({
                attributes:
                ['id','uuid','nik','nama','jk','email','no_hp','alamat','createdAt','status'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            res.status(500).json({msg: "Anda Tidak Memiliki Akses"});
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getmasyarakatById = async(req, res) =>{
    try {
        const masyarakat = await Masyarakat.findOne({
            attributes:[
                'uuid',
                'nik',
                'nama',
                'jk',
                'email',
                'no_hp',
                'alamat',
                'createdAt',
                'status',
            ],
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(masyarakat);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createMasyarakat = async(req, res) =>{
    const {email, password,nik,nama,jk,no_hp,alamat} = req.body;
    const hashPassword = await argon2.hash(password);
    try {
        await Masyarakat.create({
            email: email,
            password: hashPassword,
            nik: nik,
            nama: nama,
            jk: jk,
            no_hp: no_hp,
            alamat: alamat,
        });
        res.status(201).json({msg: "Masyarakat Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateMasyarakat = async(req, res) =>{
    try {
        const masyarakat = await Masyarakat.findOne({
            attributes:[
                'id',
                'uuid',
                'nik',
                'nama',
                'jk',
                'email',
                'no_hp',
                'alamat',
                'createdAt',
                'status',
            ],
            where:{
                id: req.params.id
            }
        });
        if(!masyarakat) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {email,nama,no_hp,alamat} = req.body;
            await Masyarakat.update({email, nama, alamat,no_hp},{
                where:{
                    id: masyarakat.id
                }
            });
        res.status(200).json({msg: "Masyarakat updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const blokMasyarakat = async(req, res) => {
    const masyarakat = await Masyarakat.findOne({
        attributes: [
            'id',
            'uuid',
            'status',
            'update_by'
        ],
        where: {
            uuid: req.params.id
        }
    });
    const st = 0;
    try {
        await Masyarakat.update({
            status: st,
        },{
            where:{
                id : masyarakat.id
            }
        })
        res.status(200).json({msg: "Masyarakat Blocked Bloked!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    
}
export const updatePassword = async (req,res) => {
    const masyarakat = await Masyarakat.findOne({
        attributes:[
            'id',
            'password',
        ],
        where:{
            id: req.params.id
        }
    })
    const password = req.body.password
    const match = await argon2.verify(masyarakat.password, req.body.confPassword);
    if(!match) return res.status(400).json({msg: "Password Lama Dan Confirmasi Password Tidak Sesuai!"})
    const hashPassword = await argon2.hash(password);
    try {
        await Masyarakat.update({
            password : hashPassword
        },{
            where: {
                id: masyarakat.id
            }
        })
        res.status(200).json({msg : "Berhasil Update"})
    } catch (error) {
        res.status(400).json({msg: "Error"})
    }
    
}
