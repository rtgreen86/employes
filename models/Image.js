const Entity = require('./Entity');
const { tables, queries } = require('./db');
const { uncapitalizeProps } = require('./utils');

module.exports = class Image extends Entity {
    author = 0;

    size = 0;

    async create() {
        this.id = await tables.Images.insert({
            Author: this.author,
            Date: this.date,
            Caption: this.caption,
            Size: this.size,
            Path: this.path
        });
        return super.create();
    }

    async update() {
        await tables.Images.update({
            Id: this.id,
            Date: this.date,
            Caption: this.caption,
            Size: this.size,
            Path: this.path
        });
        return super.create();
    }

    async delete() {
        await tables.Images.delete({ Id: this.id });
        return super.delete();
    }

    static async getById(id) {
        const _image = await tables.Images.select({ Id: id });
        return new Image(_image);
    }

    static async getList() {
        const _images = await tables.Images.selectAll();
        return _images.map((img) => new Image(img));
    }
}