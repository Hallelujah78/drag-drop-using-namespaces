/// <reference path="base-component.ts"/>
/// <reference path=".././utils/validation.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts"/>

namespace App {
  // ProjectInput Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");
      this.titleInput = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInput = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInput = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;
      this.configure();
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInput.value;
      const enteredDescription = this.descriptionInput.value;
      const enteredPeople = this.peopleInput.value;
      const titleValidateable: Validateable = {
        value: enteredTitle,
        required: true,
      };
      const descValidateable: Validateable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const peopleValidateable: Validateable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidateable) ||
        !validate(descValidateable) ||
        !validate(peopleValidateable)
      ) {
        alert("invalid input, please try again!");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    private clearInputs() {
      this.titleInput.value = "";
      this.descriptionInput.value = "";
      this.peopleInput.value = "";
    }

    @AutoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();

      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
        this.clearInputs();
      }
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }
  }
}
