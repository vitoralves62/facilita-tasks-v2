import CategoryDTO from "./categoryDTO";

class taskDTO {
    constructor(id, title, description, category = new CategoryDTO('Normal'), status = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status;
    }
}

export default taskDTO;
