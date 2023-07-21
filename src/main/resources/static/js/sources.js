let url = "http://localhost:8080/personnes";
let persons = [];
$(document).ready(function () {
    $("#btn-ajouter").click(function () {
        $("#form-container").removeClass("d-none").hide().slideDown();
    });

    $("#btn-annuler").click(function () {
        $("#form-container").slideUp(function () {
            $(this).addClass("d-none");
        });
    });


    $(".update-btn-annuler").click(function () {
        $("#updatePersonModal").mo&dal("hide");
    });

    initialLoad();
    //add
    $("#addForm").submit(addPerson);
    //delete
    $("#tblPersonnes").on("click", ".delete", deletePerson);
    //update
    $("#tblPersonnes").on("click", ".update", function(e) {
        const id = e.currentTarget.getAttribute("data-id");
        console.log("id",id);
        fillForm("updateForm",id);
        $("#updatePersonModal").modal("show");
        $("#updateIdDataInput").attr("data-id-update",id);
    });

    $("#updateForm").submit(updatePerson);
});


function initialLoad() {
    let option = {
        method: "GET"
    };
    let res = fetch(url, option)
        .then((response) => response.json())
        .then((data) => {
            persons = data;
            $("#tblPersonnes").html(genTableHTML());
        })
}

function genTableHTML() {
    let html = "";

    //table
    html += "<table class='table table-hover'>";

    // thead
    html += "<tr class='text-primary'>";
    html += "<th>id</th>";
    html += "<th>prénom</th>";
    html += "<th>nom</th>";
    html += "<th>email</th>";
    html += "<th>téléphone</th>";
    html += "<th>date de naissance</th>";
    html += "<th></th>";
    html += "<th></th>";
    html += "</tr>";

    persons.forEach(p => {
        html += "<tr class='text-primary'>";
        html += "<td>" + p.id + "</td>";
        html += "<td>" + p.firstname + "</td>";
        html += "<td>" + p.lastname + "</td>";
        html += "<td>" + p.email + "</td>";
        html += "<td>" + p.phone + "</td>";
        html += "<td>" + p.birthDate + "</td>";
        html += "<td><button type=\"button\" class=\"btn btn-outline-danger delete\" data-id=\"" + p.id + "\">Supprimer</button></td>";
        html += "<td><button type=\"button\" class=\"btn btn-outline-primary update\" data-id=\"" + p.id + "\">modifier</button></td>";
        html += "</tr>";
    })
    return html;
}


const deletePerson = (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    const url = "http://localhost:8080/personnes/" + id;
    const option = {
        method: "DELETE",
    }
    fetch(url, option).then((response) => {
        if (response.ok) {
            reloadPersonnes();
        } else {
            alert("erreur de suppression id = " + id);
        }
    })
}


const updatePerson = function(e) {
    const id = document.querySelector("#updateIdDataInput").getAttribute("data-id-update");
    const url = "http://localhost:8080/personnes/" + id;
    const personJson = JSON.stringify(Object.fromEntries(new FormData(this)));

    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: personJson,
    }
    fetch(url, option).then((response) => {
        if (response.ok) {
            reloadPersonnes();
            e.target.reset();
        } else {
            alert("erreur modification = " + personJson);
        }
    });
}

const fillForm = function(htmlId, id) {
    const form = document.getElementById(htmlId);
    person = persons.find(p=> p.id == id);


    for (const attr in person) {
        if (person.hasOwnProperty(attr)) {
            const field = form.querySelector(`[name="${attr}"]`);
            if (field) {
                field.value = person[attr];
            }
        }
    }
};

const reloadPersonnes = () => {
    initialLoad();
}


const addPerson = function(e)  {
    e.preventDefault();
    const personJson = JSON.stringify(Object.fromEntries(new FormData(this)));
    const url = "http://localhost:8080/personnes";
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: personJson,
    }
    fetch(url, option).then((response) => {
        if (response.ok) {
            reloadPersonnes();
            e.target.reset();
        } else {
            alert("erreur ajout person = " + personJson);
        }
    });
}
