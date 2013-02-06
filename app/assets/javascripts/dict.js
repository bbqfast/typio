//alert('dict');
function Node(ch, wordEnd)
{
    this.m_char = ch;
    this.m_left = null;
    this.m_center = null;
    this.m_right = null;
    this.m_wordEnd = wordEnd;
    m_score = 0;
    //internal Node m_left, m_center, m_right;
    //internal bool m_wordEnd;
}

function dict(r)
{
    this.m_root = r;
    this.Add = function(s, score, root)
    {
        if (s == null || s == "")
        {
            throw 'xxx';
        }
    
        this.Add_r(s, score, 0, root);
    }
    
    this.Add_r = function(s, score, pos, node)
    {
        if (node[0] == null)
        {
            node[0] = new Node(s[pos], false);
        }
    
        if (s[pos] < node[0].m_char)
        {
            //w('less');
            var nodewrap = [];
            nodewrap[0] = node[0].m_left;
            this.Add_r(s, score, pos, nodewrap);
            node[0].m_left = nodewrap[0];
        }
        else if (s[pos] > node[0].m_char)
        {
            // w('greate');
            var nodewrap = [];
            nodewrap[0] = node[0].m_right;
            this.Add_r(s, score, pos, nodewrap);
            node[0].m_right = nodewrap[0];
        }
        else
        {
            if (pos + 1 == s.length) { node[0].m_wordEnd = true; node[0].m_score = score}
            else
            {
                 // w('center=' + s[pos]);
                var nodewrap = [];
                nodewrap[0] = node[0].m_center;
                this.Add_r(s, score, pos + 1, nodewrap);
                node[0].m_center = nodewrap[0];
            }
        }
    } // Add_r
    
    this.prefix = function(s ,root)
    {
        if (s == null || s == "") {
            throw 'ArgumentException';
        }
     
        var pos = 0;
        var node = root[0];
        var lastnode = node;
        while (node != null)
        {
            w('prefix on =' + s[pos]);
            // w('char=' + node.m_char)
            var cmp = s[pos] - node.m_char;
            lastnode = node;
            if (s[pos] < node.m_char) { node = node.m_left; }
            else if (s[pos] > node.m_char) { node = node.m_right; }
            else
            {
                if (++pos == s.length)
                {
                    // this.log('end = ' + node.m_char);
                    return {last: node, node: node.m_center};
                }
                w('down = ' + node.m_char);
                node = node.m_center;
            }
        }
    
        // w('lastnode=' + lastnode.m_char);
        return node;
    }
    
    this.fillNode_i=  function(root, file)
    {
        var fs = require('fs');
        data = fs.readFileSync(file, 'ascii' )
            try {
            var lines = data.split(/\r?\n/);
            w('len=' + lines.length);
            for(var i=0;i<lines.length;i++)
            {
                var x = lines[i];
                // w('w='+x+ '      ' + x[0]);
                // 
                if (x[0] >= 'a' && x[0] <= 'a' )
                {
               //     w('Add('+x+ ')');
                    this.Add(x, root);
                }            
            }
            // w(root);
            } catch (e)
            {w(e);}
        w('-------------------------------------------');
    }
    
    this.list_match_i = function(s, root)
    {
        var found = this.prefix(s, root);
        // w(prenode);
        // this.log(s + ' ' + found.last.m_char);
        // s = s.substring(0, s.length - 1);
        // w('this.list='+ s);
        var mlist = [];
        this.list(found.node, s, mlist);
        if (found.last.m_wordEnd) {
            mlist.push({word: s, node: found.last});
        }
        return mlist;
    }
    
    this.list = function(n, str, mlist)
    {
        if (n == null)
        {
            return;
        }
        if (n.m_wordEnd)
        {
            // this.onlist(str + n.m_char, n);
            mlist.push({word: str + n.m_char, node: n});   // word , node
        }
        
        this.list(n.m_left, str, mlist );
        this.list(n.m_center, str + n.m_char, mlist);
        this.list(n.m_right, str, mlist);
    }
    
    this.listc = function(n, str)
    {
        if (n == null)
        {
            return;
        }
        if (n.m_wordEnd)
        {
            this.onlist(str + n.m_char, n);
        }
        
        this.list(n.m_left, str );
        this.list(n.m_center, str + n.m_char);
        this.list(n.m_right, str );
    }    
} // constructor

dict.prototype.Addword = function(s, score)
{
    this.Add(s, score, this.m_root);
}

dict.prototype.list_match = function(s)
{
    return this.list_match_i(s, this.m_root);
}

dict.prototype.fillNode = function(file)
{
    this.fillNode_i(this.m_root, file)
}

// var m_root = [{}];

function dump(n, spc)
{
    if (typeof spc == 'undefined')
    {
        spc = '';
    }
    if (n == null)
    {
        return;
    }
    dump(n.m_left, spc + ' ');
    dump(n.m_center, spc + ' ');
    w(spc + n.m_char);
    dump(n.m_right, spc + ' ');
}
    
function Contains(s, root)
{
    if (s == null || s == "") {
        throw 'ArgumentException';
    }

    var pos = 0;
    var node = root;
    while (node != null)
    {
        w('char=' + node.m_char)
        var cmp = s[pos] - node.m_char;
        if (s[pos] < node.m_char) { node = node.m_left; }
        else if (s[pos] > node.m_char) { node = node.m_right; }
        else
        {
            if (++pos == s.length) return node.m_wordEnd;
            node = node.m_center;
        }
    }

    return false;
}

function f()
{
    var fs = require('fs')
    fs.readFile('3esl.txt', '', function (err,data) {
      if (err) {
        return w(err);
      }
      w('d'+data);
    });    
}



function w(s)
{
    console.log(s);
}

function poc_read_write(file)
{
    var fs = require('fs');
    var newlines;
    data = fs.readFileSync(file, 'ascii' );
    
    var lines = data.split(/\r?\n/);
    // w('len=' + lines.length);
    for(var i=0;i<lines.length;i++)
    {
        var x = lines[i];
        newlines = newlines + x + ' 0' + '\r\n';
        // w('w='+x+ '      ' + x[0]);
        // 
    }
    fs.writeFileSync('o' + file, newlines, 'ascii');

    w('-------------------------------------------');
}

function poc_read_write(file)
{
    var fs = require('fs');
    var newlines;
    data = fs.readFileSync(file, 'ascii' );
    
    var lines = data.split(/\r?\n/);
    // w('len=' + lines.length);
    for(var i=0;i<lines.length;i++)
    {
        var x = lines[i];
        newlines = newlines + x + ' 0' + '\r\n';
        // w('w='+x+ '      ' + x[0]);
        // 
    }
    fs.writeFileSync('o' + file, newlines, 'ascii');

    w('-------------------------------------------');
}

function test()
{
    var xx="rrrrrrrr";
    var myroot = [];
    var mydict = new dict(myroot);
    //w(mydict);
    // w(xx.length);
    mydict.Addword("good");
    mydict.Addword("goody");
    mydict.Addword("goof");
    mydict.Addword("god");
    mydict.Addword("golf");
    // Add("technology");
    // w(Contains("car"));
    // w(Contains("carbon"));
    // var prenode = prefix("car", m_root);
    // w(prenode);
     dump(myroot[0]);
     w('Contains = ' +Contains('goolf', myroot[0]));
     // list(prenode, '');
    mydict.list_match("goo");
}

function dictcount()
{
    var myroot = [];
    var mydict = new dict(myroot);
        
    var dd = require('./thedict.js');
    for(var x in dd.dictdata) {
      // w( x + " : " + dd.dictdata[x] );
      mydict.Addword(x, dd.dictdata[x]);
    }
    
    mydict.list_match("too");

}
// test();
// dictcount();
// fillNode('3esl-a.txt');
// addcount('3esl-a.txt');



// Add("carbon", m_root);
// w(m_root[0]);
// dump(m_root[0]);
//list_match("app", m_root);

// test();







