

// Inicializa o Firebase
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

// Importa os recursos necessários para autenticação
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

// Importa os recursos necessários para o Firestore
import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";



const firebaseConfig = {

    apiKey: "AIzaSyDgD_RcS-ZNIOV6s6m7rz9ts04IK_L93Eg",

    authDomain: "aula-formulario-firebase.firebaseapp.com",

    projectId: "aula-formulario-firebase",

    storageBucket: "aula-formulario-firebase.firebasestorage.app",

    messagingSenderId: "800425137776",

    appId: "1:800425137776:web:380300ee38a64970c986b5",

    measurementId: "G-7ZV3QBB3WM"

};


/*
=============================================================
3. INICIALIZAÇÃO DO FIREBASE
=============================================================
*/

const app = initializeApp(firebaseConfig);


/*
=============================================================
4. INICIALIZAÇÃO DO FIREBASE AUTHENTICATION
=============================================================
*/

const auth = getAuth(app);


/*
=============================================================
5. INICIALIZAÇÃO DO CLOUD FIRESTORE
=============================================================
*/

const db = getFirestore(app);



const formulario = document.getElementById("formulario");




const mensagem = document.getElementById("mensagem");


/*
=============================================================
8. FUNÇÃO PARA MOSTRAR MENSAGENS
=============================================================
*/

function mostrarMensagem(texto) {

    if (mensagem) {

        mensagem.textContent = texto;

    } else {

        // Caso o <p id="mensagem"> não exista,
        // mostramos a mensagem no console.
        console.log(texto);

    }

}




const campoNome =
    document.getElementById("nome");

const campoSobrenome =
    document.getElementById("sobrenome");

const campoUsuario =
    document.getElementById("usuario");

const campoSenha =
    document.getElementById("senha");

const campoConfirmarSenha =
    document.getElementById("confirmarSenha");




if (
    formulario &&
    campoNome &&
    campoSobrenome &&
    campoUsuario &&
    campoSenha &&
    campoConfirmarSenha
) {

    formulario.addEventListener("submit", async (event) => {

        /*
        Impede o comportamento padrão do formulário.

        Sem isso, o navegador recarregaria a página.
        */

        event.preventDefault();


        /*
        ---------------------------------------------------------
        10.1 CAPTURAR OS DADOS DIGITADOS
        ---------------------------------------------------------
        */

        const nome =
            campoNome.value.trim();

        const sobrenome =
            campoSobrenome.value.trim();

        const email =
            document.getElementById("email").value.trim();

        const usuario =
            campoUsuario.value.trim();

        const senha =
            campoSenha.value;

        const confirmarSenha =
            campoConfirmarSenha.value;


        /*
        ---------------------------------------------------------
        10.2 VERIFICAR SE AS SENHAS SÃO IGUAIS
        ---------------------------------------------------------
        */

        if (senha !== confirmarSenha) {

            mostrarMensagem(
                "As senhas não são iguais."
            );

            return;

        }


      

        try {

            mostrarMensagem(
                "Criando sua conta..."
            );


            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    senha
                );



            const user =
                userCredential.user;


            console.log(
                "Usuário criado:",
                user.uid
            );


          

            await setDoc(
                doc(db, "usuarios", user.uid),
                {

                    uid: user.uid,

                    nome: nome,

                    sobrenome: sobrenome,

                    email: email,

                    usuario: usuario,

                    criadoEm: serverTimestamp()

                }
            );


            /*
            -----------------------------------------------------
            10.5 CADASTRO FINALIZADO
            -----------------------------------------------------
            */

            mostrarMensagem(
                "Cadastro realizado com sucesso!"
            );


            /*
            Limpa os campos do formulário.
            */

            formulario.reset();


            setTimeout(() => {

                window.location.href = "form.html";

            }, 1500);


        } catch (error) {

            /*
            Mostra o erro completo no console.
            Isso é muito útil durante a aula.
            */

            console.error(
                "Erro no cadastro:",
                error
            );


            /*
            -----------------------------------------------------
            10.7 TRATAMENTO DOS ERROS
            -----------------------------------------------------
            */

            if (
                error.code ===
                "auth/email-already-in-use"
            ) {

                mostrarMensagem(
                    "Este e-mail já está cadastrado."
                );

            }

            else if (
                error.code ===
                "auth/invalid-email"
            ) {

                mostrarMensagem(
                    "O e-mail informado é inválido."
                );

            }

            else if (
                error.code ===
                "auth/weak-password"
            ) {

                mostrarMensagem(
                    "A senha deve possuir pelo menos 6 caracteres."
                );

            }

            else {

                mostrarMensagem(
                    "Erro ao realizar cadastro. Verifique o console."
                );

            }

        }

    });

}




const campoPassword =
    document.getElementById("password");




if (
    formulario &&
    campoPassword &&
    !campoNome
) {

    formulario.addEventListener("submit", async (event) => {

        /*
        Impede o recarregamento da página.
        */

        event.preventDefault();


        /*
        Captura os dados digitados.
        */

        const email =
            document.getElementById("email").value.trim();

        const senha =
            campoPassword.value;


        /*
        ---------------------------------------------------------
        12.1 TENTAR REALIZAR O LOGIN
        ---------------------------------------------------------
        */

        try {

            mostrarMensagem(
                "Entrando..."
            );


            /*
            O Firebase verifica o e-mail e a senha.
            */

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    senha
                );


            /*
            Usuário autenticado.
            */

            const user =
                userCredential.user;


            console.log(
                "Usuário autenticado:",
                user.uid
            );


            mostrarMensagem(
                "Login realizado com sucesso!"
            );




            setTimeout(() => {

                window.location.href =
                    "principal.html";

            }, 1000);


        } catch (error) {

            console.error(
                "Erro no login:",
                error
            );


            /*
            -----------------------------------------------------
            12.3 TRATAMENTO DE ERROS
            -----------------------------------------------------
            */

            if (
                error.code ===
                "auth/invalid-credential"
            ) {

                mostrarMensagem(
                    "E-mail ou senha incorretos."
                );

            }

            else if (
                error.code ===
                "auth/invalid-email"
            ) {

                mostrarMensagem(
                    "Digite um e-mail válido."
                );

            }

            else {

                mostrarMensagem(
                    "Não foi possível realizar o login."
                );

            }

        }

    });

}


const googleLogin =
    document.getElementById("googleLogin");


if (googleLogin) {

    googleLogin.addEventListener(
        "click",
        async () => {

            try {



                const provider =
                    new GoogleAuthProvider();


                /*
                Abre a janela para o usuário
                escolher sua conta Google.
                */

                const result =
                    await signInWithPopup(
                        auth,
                        provider
                    );


                /*
                Recupera os dados do usuário.
                */

                const user =
                    result.user;


                console.log(
                    "Usuário Google:",
                    user.uid
                );




                await setDoc(
                    doc(db, "usuarios", user.uid),
                    {

                        uid: user.uid,

                        nome:
                            user.displayName || "",

                        email:
                            user.email || "",

                        foto:
                            user.photoURL || "",

                        atualizadoEm:
                            serverTimestamp()

                    },

                    {
                        merge: true
                    }

                );


                /*
                Redireciona para a página principal.
                */

                window.location.href =
                    "principal.html";


            } catch (error) {

                console.error(
                    "Erro no login com Google:",
                    error
                );


                if (
                    error.code ===
                    "auth/popup-closed-by-user"
                ) {

                    mostrarMensagem(
                        "A janela do Google foi fechada."
                    );

                }

                else {

                    mostrarMensagem(
                        "Não foi possível entrar com Google."
                    );

                }

            }

        }
    );

}




onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log(
            "Usuário conectado:",
            user.email
        );

    } else {

        console.log(
            "Nenhum usuário conectado."
        );

    }

});




const btnLogout =
    document.getElementById("btnLogout");


if (btnLogout) {

    btnLogout.addEventListener(
        "click",
        async () => {

            try {

                /*
                Encerra a sessão do usuário.
                */

                await signOut(auth);


                console.log(
                    "Usuário desconectado."
                );


                /*
                Retorna para a tela de login.
                */

                window.location.href =
                    "form.html";


            } catch (error) {

                console.error(
                    "Erro ao sair:",
                    error
                );

            }

        }
    );

}


