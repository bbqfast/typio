class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.string :name
      t.integer :score
      t.integer :rscore
      t.references :dicts

      t.timestamps
    end
  end
end
