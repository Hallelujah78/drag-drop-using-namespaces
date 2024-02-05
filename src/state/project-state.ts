namespace App {
  // Project State Management

  export type Listener<T> = (items: T[]) => void;

  // State Class
  export abstract class State<T> {
    protected listeners: Listener<T>[] = [];
    constructor() {}
    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }
  // ProjectState
  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    addProject(title: string, description: string, people: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        ProjectStatus.ACTIVE
      );

      this.projects.push(newProject);
      this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const projectToMove = this.projects.find((project) => {
        return project.id === projectId;
      });
      if (projectToMove && projectToMove.status !== newStatus) {
        projectToMove.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }

    private constructor() {
      super();
    }
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  export const projectState = ProjectState.getInstance();
}
