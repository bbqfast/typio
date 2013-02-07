class TypesController < ApplicationController 

  def index
  end
  
  def savedict
    #dict = params[:dictdata]
    dictname = params[:dictname]
    Mylog.log.info('dicname=' + dictname)
    dictinfo = Dict.find_or_initialize_by_name(dictname)
    Mylog.log.info('save:' + dictinfo.to_s)
    dictinfo.save
    Mylog.log.info('saved id:' + dictinfo.id.to_s)
    
    dict = ActiveSupport::JSON.decode( params[:json] )
    
    
    #Mylog.log.info(params.to_s)
    #Mylog.log.info('jj=' + jj)
    
    #Mylog.log.info('save:' + dict.to_s)
    #Mylog.log.info('save:' + dict.length.to_s)
     dict.each do |x|
       #Mylog.log.info('save:' + x.to_s)
       store_dict(x[0], x[1], dictinfo.id)
     end
     
     render :json => params[:dictdata].to_json    
  end

  def save
    #dict = params[:dictdata]
    dictname = params[:dictname]
    Mylog.log.info('dicname=' + dictname)
    dictinfo = Dict.find_or_initialize_by_name(dictname)
    Mylog.log.info('save:' + dictinfo.to_s)
    dictinfo.save
    Mylog.log.info('saved id:' + dictinfo.id.to_s)
    
    dict = ActiveSupport::JSON.decode( params[:json] )
    
    
    #Mylog.log.info(params.to_s)
    #Mylog.log.info('jj=' + jj)
    
    #Mylog.log.info('save:' + dict.to_s)
    #Mylog.log.info('save:' + dict.length.to_s)
     dict.each do |x|
       #Mylog.log.info('save:' + x.to_s)
       store_word(x[0], x[1], x[2], dictinfo.id)
     end
     
     render :json => params[:dictdata].to_json
  end

  def store_dict(word, cnt, dictid)
    word = Word.new
    word.score = cnt
    word.rscore = 0
    word.dicts_id = dictid
    word.save
  end

  def store_word(word, cnt, freq, dictid)
    word = Word.find_or_initialize_by_name(word)
    word.score = cnt
    word.rscore = freq
    word.dicts_id = dictid
    word.save
  end

  def load
    raw_words = Word.all
    words = [];
    raw_words.each do |x|
      words.push [x.name, x.score]
    end
    
    render :json => words.to_json
  end


end
