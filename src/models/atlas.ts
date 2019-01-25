export const atlas = [
    {
        nome: "Esqueleto Apendicular",
        filhos: [
            {
                nome: "Membro Superior",
                descricao: "",
                imagem: ["../assets/imgs/superiores.jpeg"],
                filhos: [
                    {
                        nome: "Clavícula",
                        descricao: "Osso longo com uma dupla curvatura que articula o esterno com a escápula, compondo a cintura escapular.",
                        imagem: ["../assets/imgs/claviculainferior.jpg"]
                    },
                    {
                        nome: "Escápula",
                        descricao: "É um osso par, chato bem fino podendo ser translúcido em certos pontos. Forma a parte dorsal da cintura escapular. Tem a forma triangular apresentando duas faces, três bordas e três ângulos.",
                        imagem: ["../assets/imgs/escapula1.jpg"]
                    },
                    { nome: "Úmero", descricao: "Sem Descrição", imagem: [""]},
                    { nome: "Rádio e ulna", descricao: "Sem Descrição", imagem: [""]},
                    { nome: "Ossos da mão", descricao: "Sem Descrição", imagem: [""]},
                ]
            },
            {
                nome: "Membro Inferior",
                imagem: ["../assets/imgs/inferiores.jpeg"],
                descricao: "",
                filhos: [
                    { nome: "Osso do quadril", descricao: "", imagem: [""] },
                    { nome: "Fêmur", descricao: "Sem Descrição", imagem: [""] },
                    { nome: "Patela", descricao: "Sem Descrição", imagem: [""] },
                    { nome: "Tíbia", descricao: "Sem Descrição", imagem: [""] },
                    { nome: "Fíbula", descricao: "Sem Descrição", imagem: [""] },
                    { nome: "Ossos do pé", descricao: "Sem Descrição", imagem: [""] },
                ]
            }
        ]
    },
    {
        nome: "Mamas",
        filhos: [
            {
                nome: "Pele",
                descricao: "",
                imagem: [""],
                filhos: [
                    {
                        nome: "Normal",
                        descricao: "Pele normal - BIRADS 1",
                        imagem: ["../assets/imgs/mamas/normal.jpg"]
                    },
                    {
                        nome: "Espessada",
                        descricao: "2 mm, geralmente leva a suspeição. Se história de radioterapia prévia, pode-se ser um achado esperado.",
                        imagem: ["../assets/imgs/mamas/espessada.jpg"]
                    },
                    {
                        nome: "Retraida",
                        descricao: "Retração de pele com historia de cirurgia prévia. Bi-RADS 2.",
                        imagem: ["../assets/imgs/mamas/retraida.jpg"]
                    },
                ]
            },
            {
                nome: "Composição Mamária",
                imagem: [""],
                descricao: "",
                filhos: [
                    {
                        nome: "Mamas predominantemente adiposas",
                        descricao: "",
                        imagem: ["../assets/imgs/mamas/adiposa1.jpg", "../assets/imgs/mamas/adiposa2.jpg"]
                    },
                    {
                        nome: "Mamas com densidades fibroglandulares esparsas",
                        descricao: "",
                        imagem: ["../assets/imgs/mamas/densas1.jpg", "../assets/imgs/mamas/densas2.jpg"]
                    },
                    {
                        nome: "Mamas heterogeneamente densas",
                        descricao: "",
                        imagem: ["../assets/imgs/mamas/esparsas1.jpg", "../assets/imgs/mamas/esparsas2.jpg"]
                    },
                    {
                        nome: "Mamas extremamente densas",
                        descricao: "",
                        imagem: ["../assets/imgs/mamas/hetdensas1.jpg", "../assets/imgs/mamas/hetdensas2.jpg"]
                    },
                ]
            }
        ]
    },
]
