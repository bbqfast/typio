class Word < ActiveRecord::Base
  attr_accessible :dicts, :name, :rscore, :score, :dicts_id
  belongs_to :dict
end
