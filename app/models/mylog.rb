class Mylog 
  def self.log
    @@my_logger ||= Logger.new("#{Rails.root}/log/my.log")
  end

end
