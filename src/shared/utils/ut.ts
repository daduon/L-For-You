export default class UT {
  public static setValidate(screenRef: any, options: Field) {
      screenRef["optionsValidate"] = options;
      for (const fieldName in options) {
          const fieldRef = screenRef.$refs[fieldName];
          if (!fieldRef) {
              continue;
          }
          const rootElement = fieldRef.$el ? fieldRef.$el : fieldRef;
          const inputRef = rootElement.querySelector("input");
          if (!inputRef) {
              continue;
          }
          const tipFunction = fieldRef.formItem;
          if (!tipFunction) {
              continue;
          }
          const fieldConditions = options[fieldName].conditions;
          inputRef.addEventListener("input", () => {
              this.controlMsg(screenRef, fieldName, fieldConditions);
          });

          inputRef.addEventListener("focus", () => {
              this.focusScroll(inputRef);
              this.controlMsg(screenRef, fieldName, fieldConditions);
          });
      }
  }

  public static focusScroll(inputRef: any) {
      setTimeout(() => {
          const scrollOptions = {
              block: "center",
              behavior: "smooth",
          };
          inputRef.scrollIntoView(scrollOptions);
      }, 100);
  }

  private static controlMsg(screenRef: any, fieldName: any, fieldConditions: Partial<Rule>[]) {
      const msg = this.validate(screenRef, fieldName, fieldConditions);
      const tipFunction = screenRef.$refs[fieldName].formItem;
      if (msg !== "") {
          tipFunction.setMessage(msg);
          return false;
      } else {
          tipFunction.setMessage("");;
          return true;
      }
  }

  private static validate(screenRef: any, fieldName: any, fieldConditions: Partial<Rule>[]) {
      const fieldRef = screenRef.$refs[fieldName];
      const fieldValue = screenRef[fieldName];
      for (const condition of fieldConditions) {
          const tipFunction = fieldRef.formItem;
          if (!tipFunction) {
              return "";
          }
          if (condition.type == "password") {
              const minLength = 8;
              const hasUpperCase = /[A-Z]/.test(fieldValue);
              const hasLowerCase = /[a-z]/.test(fieldValue);
              const hasNumber = /[0-9]/.test(fieldValue);
              const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(fieldValue);

              if (fieldValue.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
                  return condition.message;
              }
          }
          if (condition.check && condition.check()) {
              return condition.message;
          }
          if (condition.type == "pairRefresh") {
              const options = screenRef["optionsValidate"];
              const pairName = condition.field || "";
              const fieldConditions = options[pairName].conditions;
              this.controlMsg(screenRef, pairName, fieldConditions);
          }
      }

      return "";
  }

  public static getValidate(screenRef: any, options?: GetValOpts) {
      let validateStatus = true;
      let optionsValidate = screenRef["optionsValidate"];
      if (options?.triggerFields) {
          let validateFields = {};
          for (const field of options.triggerFields) {
              if (!optionsValidate[field]) {
                  continue;
              }
              validateFields = {
                  ...validateFields,
                  [field]: optionsValidate[field],
              };
          }
          optionsValidate = validateFields;
      }
      for (const fieldName in optionsValidate) {
          const fieldRef = screenRef.$refs[fieldName];
          if (!fieldRef) {
              continue;
          }
          const tipFunction = fieldRef.formItem;
          if (!tipFunction) {
              continue;
          }
          const fieldConditions = optionsValidate[fieldName].conditions;
          const isTipError = this.controlMsg(screenRef, fieldName, fieldConditions);
          if (validateStatus) {
              validateStatus = isTipError;
          }
      }
      return validateStatus;
  }
}

export interface Field {
  [field: string]: Condition;
}

export interface Condition {
  conditions: Partial<Rule>[];
}

export interface Rule {
  type: Type;
  check: () => boolean;
  field: string;
  message: string;
}

export interface GetValOpts {
  triggerFields: Array<string>;
}

export type Type = "password" | "pairRefresh";
