
      #########.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##."

# A little install script to
# remember howto install extension
npm install
vsce package
code --uninstall-extension kube.42header
code --install-extension 42header*.vsix
rm 42header*.vsix
