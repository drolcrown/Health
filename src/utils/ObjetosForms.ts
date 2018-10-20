import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class ObjetosForms {
    private form: FormGroup;
    private builder: FormBuilder;
    private usuarioSelecionado;
    private atrSelecionado;
    private atrInput = [];
    private usuarios = [
        {
            Nome: ['', Validators.required],
            Sobrenome: ['', Validators.required],
            Data_de_Nascimento: ['', Validators.required],
            Cidade: ['', Validators.required],
            Estado: ['', Validators.required],
            Email: ['', Validators.required],
            Senha: ['', Validators.required],
            Confirmar_Senha: ['', Validators.required],
        },
        {
            Nome: ['', Validators.required],
            Sobrenome: ['', Validators.required],
            Data_de_Nascimento: ['', Validators.required],
            Cidade: ['', Validators.required],
            Estado: ['', Validators.required],
            Profissao: ['', Validators.required],
            Email: ['', Validators.required],
            Senha: ['', Validators.required],
            Confirmar_Senha: ['', Validators.required],
        }
    ];

    constructor() {
        this.form = this.builder.group(this.usuarios[0]);
        this.usuarioSelecionado = this.usuarios[0];
        this.popularControls();
        this.atrSelecionado = this.atrInput[0];
    }

    private popularControls() {
        this.atrInput = [
            [
                { tipo: "text", max: "", control: this.form.controls.Nome },
                { tipo: "text", max: "", control: this.form.controls.Sobrenome },
                { tipo: "date", max: "9999-12-12", control: this.form.controls.Data_de_Nascimento },
                { tipo: "text", max: "", control: this.form.controls.Cidade },
                { tipo: "text", max: "", control: this.form.controls.Estado },
                { tipo: "email", max: "", control: this.form.controls.Email },
                { tipo: "password", max: "", control: this.form.controls.Senha },
                { tipo: "password", max: "", control: this.form.controls.Confirmar_Senha },
            ],
            [
                { tipo: "text", max: "", control: this.form.controls.Nome },
                { tipo: "text", max: "", control: this.form.controls.Sobrenome },
                { tipo: "date", max: "9999-12-12", control: this.form.controls.Data_de_Nascimento },
                { tipo: "text", max: "", control: this.form.controls.Cidade },
                { tipo: "text", max: "", control: this.form.controls.Estado },
                { tipo: "text", max: "", control: this.form.controls.Profissao },
                { tipo: "email", max: "", control: this.form.controls.Email },
                { tipo: "password", max: "", control: this.form.controls.Senha },
                { tipo: "password", max: "", control: this.form.controls.Confirmar_Senha },
            ],
        ];
    }

    public getForm(): FormGroup {
        return this.form;
    }

    public setForm(valor) {
        this.form = this.builder.group(this.usuarios[valor]);
        this.usuarioSelecionado = this.usuarios[valor];
        this.atrSelecionado = this.atrInput[valor];
    }

    public getUsuario() {
        return this.usuarioSelecionado;
    }

    public getAtrInput() {
        return this.atrSelecionado;
    }
}