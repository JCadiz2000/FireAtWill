const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql.js")
const mid = require("../controller/middleware.js");

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get("/",mid.admin,(req,res)=>{
    mysql.getDashboard((dashboard)=>{
       res.render("admin/dashboard", {appCount:dashboard[0],appCur:dashboard[1],onProj:dashboard[2],clients:dashboard[3]}
       );      
    })
})

router.get("/artist",mid.admin,(req,res)=>{
    mysql.getArtist((artist)=>{
        console.log(artist)
        res.render("admin/artist_records", {artists:artist});
    })
})

router.post("/artist",mid.admin,(req,res)=>{
    console.log(req.body)
    mysql.addArtist(req.body,()=>{
        res.redirect("/admin/artist")
    })
})

router.post("/artistupdate",mid.admin,(req,res)=>{
    mysql.updateArtist(req.body, parseInt(req.query.id), ()=>{
        res.redirect("/admin/artist")
    })
})


router.get("/client",mid.admin,(req,res)=>{
    mysql.getClient((client)=>{
        console.log(client)
        res.render("admin/client_records", {clients:client});
    })
})

router.post("/client",mid.admin,(req,res)=>{
    console.log(req.body)
    mysql.addClient(req.body,()=>{
        res.redirect("/admin/client")
    })
})

router.post("/clientupdate",mid.admin,(req,res)=>{
    mysql.updateClient(req.body, parseInt(req.query.id), ()=>{
        res.redirect("/admin/client")
    })
})


router.get("/adminregistration",mid.admin,(req,res)=>{
    res.render("admin/adminregistration")
})

router.post("/adminregistration",mid.admin,(req,res)=>{
    mysql.adminRegistration(req.body,()=>{
        res.redirect("/admin")
    })
})

router.post("/adminlogin",mid.home,(req,res)=>{
    mysql.adminLogin(req.body,(user)=>{
        if(user){
            req.session.userid=user[0].admin_ID;
            req.session.type="admin";
            req.session.user= user[0].First_Name+" "+user[0].Last_Name;
            res.redirect("/admin");
        }else{
            res.redirect("/adminlogin");
        }
    });
})

router.get("/appointments",mid.admin,(req,res)=>{
    mysql.getGallery((img)=>{
        mysql.getClient((clients)=>{
            mysql.getAllAppointments((app)=>{
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                res.render("admin/appointments",{apps:app,months:months,clients:clients,images:img});
            })
        });
    })
});



router.get("/project_records",mid.admin,(req,res)=>{
    // res.render("admin/project_records");
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    mysql.getProjects((project)=>{
        mysql.getClient((client)=>{
            mysql.getArtist((artist)=>{
                mysql.getGallery((design)=>{
                    res.render("admin/project_records", {projects:project, clients:client, artists:artist, designs:design, months:months})
                })  
            })          
        })   
    })
})  

router.post("/newproject",mid.admin,(req,res)=>{
    console.log(req.body)
    mysql.addProject(req.body,()=>{
        res.redirect("/admin/project_records")
    })
})

router.post("/endProject",mid.admin,(req,res)=>{
    console.log(req.body)
    mysql.endProject(req.body,()=>{
        res.redirect("/admin/project_records")
    })
})

router.get("/session_records",mid.admin,(req,res)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    mysql.getSessions(parseInt(req.query.Project_id),(session)=>{
        res.render("admin/session_records", {payments:session[2],project:session[0],sessions:session[1], source:req.query, months:months})
    });
})

router.post("/newsession",mid.admin,(req,res)=>{
    mysql.addSession(req.body,()=>{
        res.redirect("/admin/session_records?Project_id="+req.query.id+"&Client_name="+req.query.client);
    })
})

router.get("/transaction_records",mid.admin,(req,res)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    mysql.getTransactions((trans)=>{
        res.render("admin/transaction_records", {transactions:trans[0], clients:trans[1], months:months})
    })
})

router.post("/newtrans",mid.admin,(req,res)=>{
    mysql.addTrans(parseInt(req.query.client),parseInt(req.query.id),req.body,()=>{
        mysql.getClient((clients)=>{
            res.redirect("/admin/session_records?Project_id="+req.query.Project_id+"&Client_name="+req.query.Client_name);
        })
    });
});

router.post("/preview",mid.admin,(req,res)=>{
    if(parseInt(req.query.id)==0){
        res.end();
    }else{
        mysql.previewImage(parseInt(req.query.id),(img)=>{
            res.render("client/imgprev",{link:img[0].Image_Link});
        })
    }
});

router.post("/projdone",mid.admin,(req,res)=>{
    mysql.doneProject(parseInt(req.query.id),()=>{
        res.redirect("/admin/project_records");
    });
});

router.post("/appstatus",mid.admin,(req,res)=>{
    console.log(req.query)
    mysql.appStatus(parseInt(req.query.id),parseInt(req.query.check),()=>{
        res.redirect("/admin/appointments");
    });
});

module.exports= router;