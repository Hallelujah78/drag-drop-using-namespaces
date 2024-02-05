/// <reference path="base-component.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../models/drag-drop.ts"/>
/// <reference path="../models/project.ts"/>
/// <reference path="../state/project-state.ts"/>

namespace App {
  // ProjectList class
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    projectsToRender: Project[];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);
      this.projectsToRender = [];
      this.configure();
      this.renderContent();
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);
      projectState.addListener((projects: Project[]) => {
        const filteredProjects = projects.filter((project) => {
          if (this.type === "active") {
            return ProjectStatus.ACTIVE === project.status;
          }
          return project.status === ProjectStatus.FINISHED;
        });
        this.projectsToRender = filteredProjects;
        this.renderProjects();
      });
    }

    private renderProjects() {
      const listDOM = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;
      listDOM.innerHTML = "";
      for (const projectItem of this.projectsToRender) {
        new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
      }
    }

    renderContent() {
      this.element.querySelector("ul")!.id = `${this.type}-projects-list`;
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " PROJECTS";
    }
    @AutoBind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }
    @AutoBind
    dropHandler(event: DragEvent) {
      const projectId = event.dataTransfer!.getData("text/plain");

      projectState.moveProject(
        projectId,
        this.type === "active" ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
      );

      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }
    @AutoBind
    dragLeaveHandler(_: DragEvent) {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }
  }
}
