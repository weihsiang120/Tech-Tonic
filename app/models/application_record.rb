class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  def self.search(keyword)
    where("title like ? or content like ?", "%#{keyword}%", "%#{keyword}%")
  end

end
