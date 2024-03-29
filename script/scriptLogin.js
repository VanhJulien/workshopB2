$('#envoyer').click((event) => { 
    event.preventDefault();

    $('p').remove();
    let erreur = false;

    //On vérifie qu'aucun champ n'est vide
    let champs = document.querySelectorAll('input')
    for (champ of champs) {
        if (champ.value == ''){
            champ.style.borderColor = "red";
            $("<p> Ce champ n'est pas rempli.</p>").insertAfter(champ);
            erreur = true;
        } else {
            champ.style.borderColor = "silver";
        }
    }

    //On vérifie que l'email a été entré avec un format valide
    let str = document.querySelector("#mail").value;
    if(str!=''){
        if(!str.includes('@')){
            $('#mail').css('borderColor', "red");
            $("<p> Une adresse mail doit contenir un '@'.</p>").insertAfter($('#mail'));
            erreur = true;
        }
        if(!str.includes('.')){
            $('#mail').css('borderColor', "red");
            $("<p> Une adresse mail doit contenir un '.'</p>").insertAfter($('#mail'));
            erreur = true;
        }
    }
    
    //Si aucun problème n'a été détécter, on peut envoyer le formulaire
    if (!erreur){
        $.ajax({
            type: 'POST',
            url: '../php/login.php',
            dataType: 'json',
            data : {
                mail : document.querySelector("#mail").value,
                mdp : document.querySelector("#mdp").value,
            },
            success: (data) => {
                if (data.error){
                    alert(data.message);
                    document.querySelector("#mdp").value='';
                } else {
                    alert("Vous êtes maintenant connecté");
                    window.location.replace(data.message);
                }
            },
            error: (data) => {
              console.log(data);
            }
          });
    } else {
        $("<p>Un ou plusieurs problèmes ont été détectés.</p>").insertAfter($('form'));
    }
});