import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function senhasIguaisValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const senha = formGroup.get('senha');
    const confirmarSenha = formGroup.get('confirmarSenha');

    if (!senha || !confirmarSenha) return null;

    if (senha.value !== confirmarSenha.value) {
      confirmarSenha.setErrors({ senhasDiferentes: true });
    } else {
      const errors = confirmarSenha.errors;
      if (errors) {
        delete errors['senhasDiferentes'];
        if (Object.keys(errors).length === 0) {
          confirmarSenha.setErrors(null);
        } else {
          confirmarSenha.setErrors(errors);
        }
      }
    }

    return null;
  };
}
