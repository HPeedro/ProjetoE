var usuario;
var id;
var cpf;
var type;

exports.getUsuario =()=>{
   return this.usuario;
};

exports.getId = () =>{
    return this.id;
};

exports.getCpf = () =>{
    return this.cpf;
};

exports.getType = () => {
  return this.type;
}

exports.saveUsuario = (usuario,id,cpf,type)=>{
  this.usuario = usuario;
  this.id = id;
  this.cpf = cpf;
  this.type = type;
};

exports.doLogout = ()=>{
    this.usuario = null;
    this.id = null;
    this.cpf = null;
    this.type = null;
  };