package com.lue.pcsistel.exception;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


public class IsCorrectAddressValidator implements ConstraintValidator<IsCorrectAddress, Address> {
    @Override
    public void initialize(IsCorrectAddress constraintAnnotation) {
 
    }
 
    @Override
    public boolean isValid(Address value, ConstraintValidatorContext context) {
        if (value == null) return true;
 
        if (value.getName() == null || value.getName()==null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Name is required")
                    .addPropertyNode("name").addConstraintViolation();
            return false;
        }
 
        if (value.isCompany()){
            if (value.getTaxId() == null || value.getTaxId()==null) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("TaxId is required for company address")
                    .addPropertyNode("taxId").addConstraintViolation();
                return false;
            }
        }
        return true;
    }
}