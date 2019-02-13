export const atlas = [
	// {
	// 	nome: "Esqueleto Apendicular",
	// 	filhos: [
	// 		{
	// 			nome: "Membro Superior",
	// 			descricao: "",
	// 			imagem: ["../assets/imgs/superiores.jpeg"],
	// 			filhos: [
	// 				{
	// 					nome: "Clavícula",
	// 					descricao: "Osso longo com uma dupla curvatura que articula o esterno com a escápula, compondo a cintura escapular.",
	// 					imagem: ["../assets/imgs/claviculainferior.jpg"]
	// 				},
	// 				{
	// 					nome: "Escápula",
	// 					descricao: "É um osso par, chato bem fino podendo ser translúcido em certos pontos. Forma a parte dorsal da cintura escapular. Tem a forma triangular apresentando duas faces, três bordas e três ângulos.",
	// 					imagem: ["../assets/imgs/escapula1.jpg"]
	// 				},
	// 				{ nome: "Úmero", descricao: "Sem Descrição", imagem: [] },
	// 				{ nome: "Rádio e ulna", descricao: "Sem Descrição", imagem: [] },
	// 				{ nome: "Ossos da mão", descricao: "Sem Descrição", imagem: [] },
	// 			]
	// 		},
	// 		{
	// 			nome: "Membro Inferior",
	// 			imagem: ["../assets/imgs/inferiores.jpeg"],
	// 			descricao: "",
	// 			filhos: [
	// 				{ nome: "Osso do quadril", descricao: "", imagem: [] },
	// 				{ nome: "Fêmur", descricao: "Sem Descrição", imagem: [] },
	// 				{ nome: "Patela", descricao: "Sem Descrição", imagem: [] },
	// 				{ nome: "Tíbia", descricao: "Sem Descrição", imagem: [] },
	// 				{ nome: "Fíbula", descricao: "Sem Descrição", imagem: [] },
	// 				{ nome: "Ossos do pé", descricao: "Sem Descrição", imagem: [] },
	// 			]
	// 		}
	// 	]
	// },
	{
		nome: "Mamas",
		filhos: [
			{
				nome: "Pele",
				descricao: "",
				imagem: [],
				filhos: [
					{
						nome: "Normal",
						descricao: "Pele normal - BIRADS 1",
						legenda: "",
						imagem: ["../assets/imgs/mama/normal.jpg"]
					},
					{
						nome: "Espessada",
						descricao: "2 mm, geralmente leva a suspeição. Se história de radioterapia prévia, pode-se ser um achado esperado.",
						legenda: "",
						imagem: ["../assets/imgs/mama/espessada.jpg"]
					},
					{
						nome: "Retraida",
						descricao: "Retração de pele com historia de cirurgia prévia. Bi-RADS 2.",
						legenda: "",
						imagem: ["../assets/imgs/mama/retraida.jpg"]
					},
				]
			},
			{
				nome: "Composição Mamária",
				imagem: [],
				descricao: "",
				filhos: [
					{
						nome: "Mama predominantemente adiposas",
						descricao: "",
						legenda: "",
						imagem: ["../assets/imgs/mama/adiposa1.jpg", "../assets/imgs/mama/adiposa2.jpg"]
					},
					{
						nome: "Mama com densidades fibroglandulares esparsas",
						descricao: "",
						legenda: "",
						imagem: ["../assets/imgs/mama/densas1.jpg", "../assets/imgs/mama/densas2.jpg"]
					},
					{
						nome: "Mama heterogeneamente densas",
						descricao: "O que pode ocultar pequenos nódulos",
						legenda: "",
						imagem: ["../assets/imgs/mama/esparsas1.jpg", "../assets/imgs/mama/esparsas2.jpg"]
					},
					{
						nome: "Mama extremamente densas",
						descricao: "O que diminui a sensibilidade da mamografia",
						legenda: "",
						imagem: ["../assets/imgs/mama/hetdensas1.jpg", "../assets/imgs/mama/hetdensas2.jpg"]
					},
				]
			},
			{

				nome: "Assimetrias",
				imagem: [],
				descricao: "",
				filhos: [
					{
						nome: "Assimetria",
						descricao: "Vista somente em uma incidência, sendo a maioria efeito da somarão dos tecidos. Bi-RADS 0.",
						legenda: "",
						imagem: ["../assets/imgs/mama/assimetria1.jpg", "../assets/imgs/mama/assimetria2.jpg"]
					},
					{
						nome: "Assimetria Global",
						descricao: "Maior que um quadrante. Geralmente representa variação da normalidade.",
						legenda: "",
						imagem: ["../assets/imgs/mama/noimg.jpg", "../assets/imgs/mama/noimg.jpg"]
					},
					{
						nome: "Assimetria focal",
						descricao: "Menor que um quadrante. Forma similar em diferentes incidências (achado real). Bi-RADS 3.",
						legenda: "",
						imagem: ["../assets/imgs/mama/focal1.jpg", "../assets/imgs/mama/focal2.jpg"]
					},
					{
						nome: "Assimetria em desenvolvimento",
						descricao: "Assimetria focal nova, maior ou mais conspícua em comparação a exames anteriores. Bi-RADS 4.",
						legenda: "",
						imagem: ["../assets/imgs/mama/desenvolvimento1.jpg", "../assets/imgs/mama/desenvolvimento2.jpg"]
					},
				]
			},
			{
				nome: "Nódulos",
				filhos: [
					{
						nome: "Forma",
						imagem: [],
						descricao: "",
						filhos: [
							{
								nome: "Oval - 1",
								descricao: "Nódulo oval, circunscrito, com densidade semelhante ao parênquima apresentando calcificação redonda no seu interior. Formato elipsoide, podendo conter até 3 (três ondulações). Bi-RADS 3.",
								legenda: "",
								imagem: ["../assets/imgs/mama/oval1.jpg"]
							},
							{
								nome: "Oval - 2",
								descricao: "Nódulo oval, circunscrito, com alta densidade. Formato elipsoide, podendo conter até 3 (três ondulações). Bi-RADS 3.",
								legenda: "",
								imagem: ["../assets/imgs/mama/oval2.jpg"]
							},
							{
								nome: "Redondo - 1",
								descricao: "Nódulo redondo, circunscrito, com densidade semelhante ao parênquima. Bi-RADS 4.",
								legenda: "",
								imagem: ["../assets/imgs/mama/redondo1.jpg"]
							},
							{
								nome: "Redondo - 2",
								descricao: "Nódulos redondos, circunscritos, com densidade semelhante ao parênquima e presença de calcificações grosseiras de permeio. Bi-RADS 2",
								legenda: "",
								imagem: ["../assets/imgs/mama/redondo2.jpg"]
							},
							{
								nome: "Irregular",
								descricao: "Não se encaixa nas outras duas classificações anteriores. Maior grau de suspeição em relação a forma. Margem indistinta, com densidade semelhante ao parênquima. Bi-RADS 4",
								legenda: "",
								imagem: ["../assets/imgs/mama/irregular.jpg"]
							},

						]
					},
					{
						nome: "Margem",
						imagem: [],
						descricao: "",
						filhos: [
							{
								nome: "Circunscrita",
								descricao: "Nódulo oval, circunscrito, com densidade semelhante ao parênquima e apresentando calcificações redondas de permeio. Bi-RADS 2. Margem nítida (> 75%) com o tecido adjacente.",
								legenda: "",
								imagem: ["../assets/imgs/mama/margem1.jpg"]
							},
							{
								nome: "Obscurecida",
								descricao: "Parte da margem (> 25%) do nódulo está oculta por tecido fibroglandular adjacente. Necessita-se realizar complemento para tentar dispersar o tecido sobreposto. Nódulo oval, com margem obscurecida, com densidade semelhante ao parênquima apresentando calcificações amorfas. Bi-RADS 0",
								legenda: "",
								imagem: ["../assets/imgs/mama/margem2.jpg"]
							},
							{
								nome: "Microlobulada",
								descricao: "Nódulo com margem microlobulada. Pequenas ondulações. Achado suspeito.",
								legenda: "",
								imagem: ["../assets/imgs/mama/noimg.jpg"]
							},
							{
								nome: "Indistinta",
								descricao: "Indefinição da margem que não se deve ao tecido fibroglandular adjacente. Nódulo irregular, com margem indistinta, com densidade semelhante ao parênquima. Bi-RADS 4",
								legenda: "",
								imagem: ["../assets/imgs/mama/margem4.jpg"]
							},
							{
								nome: "Espiculada",
								descricao: "Traçados que se irradiam do nódulo. Achado suspeito. Nódulo oval, com margem espiculada, com densidade semelhante ao parênquima. Bi-RADS 4",
								legenda: "",
								imagem: ["../assets/imgs/mama/margem5.jpg"]
							},
						]
					},
					{
						nome: "Densidade",
						imagem: [],
						descricao: "",
						filhos: [
							{
								nome: "Alta densidade",
								descricao: "Nódulo irregular, com margem indistinta, com alta densidade. Bi-RADS 4.",
								legenda: "Testando legenda",
								imagem: ["../assets/imgs/mama/densi1.jpg", "../assets/imgs/mama/densi2.jpg"]
							},
							{
								nome: "Densidade igual",
								descricao: "Nódulos ovais, circunscritos, com densidade semelhante ao parênquima. Bi-RADS 3",
								legenda: "Testando legenda",
								imagem: ["../assets/imgs/mama/densi3.jpg"]
							},
							{
								nome: "Baixa densidade",
								descricao: "Pode corresponder a microcistos agrupados, devendo ser investigado.",
								legenda: "",
								imagem: ["../assets/imgs/mama/noimg.jpg"]
							},
							{
								nome: "Conteúdo adiposo",
								descricao: "Quase sempre benigno. Nódulos redondos, circunscritos, com  conteúdo adiposo. Calcificações cutâneas. Bi-RADS 2",
								legenda: "",
								imagem: ["../assets/imgs/mama/densi4.jpg"]
							},
						]
					},
				]
			},
			{
				nome: "Calcificações",
				filhos: [
					{
						nome: "Tipicamente benignas",
						imagem: [],
						descricao: "",
						filhos: [
							{
								nome: "Cutâneas",
								descricao: "Calcificações redondas, anelares e com centro radiotransparente. Bi-RADS 2",
								legenda: "",
								imagem: ["../assets/imgs/mama/cut1.jpg"]
							},
							{
								nome: "Vasculares",
								descricao: "Calcificações tubulares relacionadas a vasos sanguíneos. Bi-RADS 2",
								legenda: "",
								imagem: ["../assets/imgs/mama/vasc1.jpg"]
							},
							{
								nome: "Grosseiras (pipoca)",
								descricao: "> 2-3 mm no maior diâmetro. Típicas de fribroadenomas em involução. Bi-RADS 2",
								legenda: "",
								imagem: ["../assets/imgs/mama/gros1.jpg", "../assets/imgs/mama/gros2.jpg"]
							},
							{
								nome: "Grandes (bastonetes)",
								descricao: "≥ 0,5 mm, associadas a ectasias ductais, seguindo em direção à papila, geralmente bilaterais. Bi-RADS2",
								legenda: "",
								imagem: ["../assets/imgs/mama/bast1.jpg"]
							},
							{
								nome: "Redondas",
								descricao: "Provavelmente formadas nos ácinos  lobulares, < 1,0 mm (< 0,5 mm são consideradas puntiformes). Bi-RADS 2",
								legenda: "",
								imagem: ["../assets/imgs/mama/red1.jpg"]
							},
							{
								nome: "Cutâneas",
								descricao: "Calcificações redondas, anelares e com centro radiotransparente. Bi-RADS 2",
								legenda: "",
								imagem: ["../assets/imgs/mama/cut1.jpg"]
							},
							{
								nome: "Anelares",
								descricao: "Calcificações finas, geralmente < 1 mm de espessura, redondas ou ovais, com superfície regular e centro radiotransparente. Bi-RADS 2",
								legenda: "",
								imagem: ["../assets/imgs/mama/ane1.jpg"]
							},
							{
								nome: "Distróficas",
								descricao: "Irregulares e, em geral, medem > 1mm. Se formam na mama irradiada, após trauma ou cirurgia. Bi-RADS 2",
								legenda: "",
								imagem: ["../assets/imgs/mama/dist1.jpg", "../assets/imgs/mama/dist2.jpg"]
							},
							{
								nome: "Leite de cálcio",
								descricao: "Calcificações sedimentadas em cistos. Alteram a forma nas diferentes incidências. Bi-RADS 2.",
								legenda: "",
								imagem: ["../assets/imgs/mama/leit1.jpg", "../assets/imgs/mama/leit2.jpg"]
							},
							{
								nome: "Fios de sutura",
								descricao: "",
								legenda: "",
								imagem: ["../assets/imgs/mama/noimg.jpg"]
							},
						]
					},
					{
						nome: "Morfologia suspeita",
						imagem: [],
						descricao: "",
						filhos: [
							{
								nome: "Amorfas",
								descricao: "Aspecto de poeira, não podendo delimitar seus limites. Bi-RADS 4B.",
								legenda: "",
								imagem: ["../assets/imgs/mama/amorf1.jpg"]
							},
							{
								nome: "Heterogêneas grosseiras",
								descricao: "Irregulares, medindo entre 0,5 e 1 mm, tendendo a coalescer. Menores que as distróficas. Bi-RADS 4B.",
								legenda: "",
								imagem: ["../assets/imgs/mama/gross1.jpg"]
							},
							{
								nome: "Pleomórficas finas",
								descricao: "Variam em tamanho e forma, geralmente < 0,5 mm. Bi-RADS 4B.",
								legenda: "",
								imagem: ["../assets/imgs/mama/pleo1.jpg", "../assets/imgs/mama/pleo2.jpg"]
							},
							{
								nome: "Lineares finas ou lineares ramificadas",
								descricao: "",
								legenda: "",
								imagem: ["../assets/imgs/mama/noimg.jpg"]
							},
						]
					},
					{
						nome: "Distribuição",
						imagem: [],
						descricao: "",
						filhos: [
							{
								nome: "Difusa",
								descricao: "Calcificações difusas bilateralmente. Bi-RADS 2.",
								legenda: "",
								imagem: ["../assets/imgs/mama/dif1.jpg", "../assets/imgs/mama/dif2.jpg"]
							},
							{
								nome: "Regional",
								descricao: "Calcificações de distribuição regional, ≥ 2 cm . Bi-RADS 3.",
								legenda: "",
								imagem: ["../assets/imgs/mama/reg1.jpg"]
							},
							{
								nome: "Agrupada",
								descricao: "Calcificações agrupadas, < 2 cm . Bi-RADS 4B.",
								legenda: "",
								imagem: ["../assets/imgs/mama/agrup1.jpg"]
							},
							{
								nome: "Linear",
								descricao: "Calcificações de distribuição linear. Bi-RADS 2.",
								legenda: "",
								imagem: ["../assets/imgs/mama/lin1.jpg"]
							},
							{
								nome: "Segmentar",
								descricao: "Calcificações de distribuição segmentar. Bi-RADS 4.",
								legenda: "",
								imagem: ["../assets/imgs/mama/seg1.jpg"]
							},
						]
					},
				]
			},
			{
				nome: "Outros achados",
				imagem: [],
				descricao: "",
				filhos: [
					{
						nome: "Distorção arquitetural",
						descricao: "Parênquima distorcido, sem nódulo evidente. Pode estar associado a assimetrias ou calcificações. Sem história de trauma ou cirurgia, deve ser classificada como suspeita. Distorção arquitetural (linhas finas radiadas), sem história de cirurgia ou trauma. Bi-RADS 4.",
						legenda: "",
						imagem: ["../assets/imgs/mama/distarq1.jpg"]
					},
					{
						nome: "Linfonodo intramamário",
						descricao: "Aspecto reniforme, circunscrito e com hilo gorduroso. Geralmente de localização lateral e superior, podendo acontecer em qualquer lugar. Necessita de complemento para demonstrar suas características. Linfonodo intramamário com seu aspecto reniforme, hilo gorduroso e adjacente a um vaso sanguíneo. Bi-RADS 2.",
						legenda: "",
						imagem: ["../assets/imgs/mama/intra1.jpg", "../assets/imgs/mama/intra2.jpg"]
					},
					{
						nome: "Ducto único dilatado",
						descricao: "",
						legenda: "",
						imagem: ["../assets/imgs/mama/noimg.jpg", "../assets/imgs/mama/noimg.jpg"]
					},
					{
						nome: "Retração da papila",
						descricao: "Não confundir com papila invertida, que costuma ser bilateral. Se achado novo, suspeitar de malignidade avançada. Retração papila pós-cirúrgica. Bi-RADS 2.",
						legenda: "",
						imagem: ["../assets/imgs/mama/retr1.jpg"]
					},
					{
						nome: "Espessamento trabecular",
						descricao: "Paciente com insuficiência cardíaca descompensada - Espessamento trabecular. Bi-RADS 2.",
						legenda: "",
						imagem: ["../assets/imgs/mama/trab1.jpg", "../assets/imgs/mama/trab2.jpg"]
					},
					{
						nome: "Linfonodos normais",
						descricao: "Linfonodos de configuração habitual – BiRADS 1",
						legenda: "",
						imagem: ["../assets/imgs/mama/linf1.jpg", "../assets/imgs/mama/linf2.jpg"]
					},
					{
						nome: "Adenopatia axilar",
						descricao: "Adenopatia axilar sem causa explicável. Bi-RADS 4.",
						legenda: "",
						imagem: ["../assets/imgs/mama/adeno1.jpg"]
					},
					{
						nome: "Ginecomastia",
						descricao: "BiRADS 2",
						legenda: "",
						imagem: ["../assets/imgs/mama/gine1.jpg", "../assets/imgs/mama/gine2.jpg"]
					},
				]
			},
		]
	}
]