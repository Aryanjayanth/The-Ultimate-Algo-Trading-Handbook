/* Documentation Search Engine - The Ultimate Algo Trading Handbook */

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
});

function initSearch() {
  const trigger = document.getElementById('search-trigger');
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  
  if (!trigger || !modal || !input || !resultsContainer) return;
  
  let searchIndex = [];
  let selectedIndex = -1;
  
  // Build search index
  buildIndex();
  
  // Open search modal
  trigger.addEventListener('click', openModal);
  
  // Close search modal on backdrop click or Escape key
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    // Open on Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openModal();
    }
    
    // Open on '/' if not focused on input elements
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openModal();
    }
    
    // Close on Escape
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
    
    // Navigate results with arrows
    if (modal.classList.contains('active')) {
      handleKeyboardNavigation(e);
    }
  });
  
  // Handle search input events
  input.addEventListener('input', () => {
    const query = input.value.trim();
    if (query.length < 2) {
      resultsContainer.innerHTML = '<div class="search-empty">Type at least 2 characters to search...</div>';
      selectedIndex = -1;
      return;
    }
    
    const results = queryIndex(query);
    renderResults(results, query);
  });
  
  function openModal() {
    modal.classList.add('active');
    setTimeout(() => input.focus(), 50);
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('active');
    input.value = '';
    resultsContainer.innerHTML = '<div class="search-empty">Type at least 2 characters to search...</div>';
    selectedIndex = -1;
    document.body.style.overflow = '';
  }
  
  function buildIndex() {
    const sections = document.querySelectorAll('section.section');
    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      const sectionNum = section.querySelector('.section-num')?.textContent || '00';
      const sectionTitle = section.querySelector('h2')?.textContent || 'Untitled';
      
      // Index section title
      searchIndex.push({
        id: sectionId,
        section: `${sectionNum} — ${sectionTitle}`,
        title: sectionTitle,
        content: sectionTitle,
        type: 'title',
        element: section
      });
      
      // Index subheadings (h3)
      const subheadings = section.querySelectorAll('h3');
      subheadings.forEach(sub => {
        searchIndex.push({
          id: sectionId,
          section: `${sectionNum} — ${sectionTitle}`,
          title: sub.textContent.replace('▸ ', '').replace('→ ', ''),
          content: sub.textContent,
          type: 'subheading',
          element: sub
        });
      });
      
      // Index paragraphs (p)
      const paragraphs = section.querySelectorAll('p');
      paragraphs.forEach(p => {
        if (p.textContent.trim().length > 10) {
          searchIndex.push({
            id: sectionId,
            section: `${sectionNum} — ${sectionTitle}`,
            title: sectionTitle,
            content: p.textContent,
            type: 'paragraph',
            element: p
          });
        }
      });
      
      // Index table cells
      const cells = section.querySelectorAll('td');
      cells.forEach(td => {
        if (td.textContent.trim().length > 15) {
          searchIndex.push({
            id: sectionId,
            section: `${sectionNum} — ${sectionTitle}`,
            title: 'Table Reference',
            content: td.textContent,
            type: 'table',
            element: td
          });
        }
      });
    });
  }
  
  function queryIndex(query) {
    const keywords = query.toLowerCase().split(/\s+/).filter(q => q.length > 0);
    
    return searchIndex.map(item => {
      let score = 0;
      const contentLower = item.content.toLowerCase();
      const titleLower = item.title.toLowerCase();
      
      keywords.forEach(word => {
        if (titleLower.includes(word)) {
          score += 10; // High score for matches in titles
        }
        if (contentLower.includes(word)) {
          score += 2;
        }
      });
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Limit to top 10 results
  }
  
  function renderResults(results, query) {
    resultsContainer.innerHTML = '';
    selectedIndex = -1;
    
    if (results.length === 0) {
      resultsContainer.innerHTML = '<div class="search-empty">No results found. Try a different query.</div>';
      return;
    }
    
    results.forEach((res, index) => {
      const itemLink = document.createElement('a');
      itemLink.href = `#${res.id}`;
      itemLink.className = 'search-item';
      itemLink.setAttribute('data-index', index);
      
      // Highlight query inside content snippet
      let snippet = res.content;
      if (snippet.length > 120) {
        // Find index of first matched word
        const queryIndex = snippet.toLowerCase().indexOf(query.toLowerCase().split(' ')[0]);
        const start = Math.max(0, queryIndex - 40);
        snippet = (start > 0 ? '...' : '') + snippet.substring(start, start + 120) + (snippet.length > start + 120 ? '...' : '');
      }
      
      const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery.split(' ').join('|')})`, 'gi');
      const highlightedSnippet = snippet.replace(regex, '<mark>$1</mark>');
      const highlightedTitle = res.title.replace(regex, '<mark>$1</mark>');
      
      itemLink.innerHTML = `
        <div class="search-item-title">
          <span>${highlightedTitle}</span>
          <span class="search-item-section">${res.section}</span>
        </div>
        <div class="search-item-snippet">${highlightedSnippet}</div>
      `;
      
      itemLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
        
        // Scroll to element smoothly
        res.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight element temporarily
        const origBg = res.element.style.backgroundColor;
        res.element.style.backgroundColor = 'var(--cyan-glow)';
        setTimeout(() => {
          res.element.style.backgroundColor = origBg;
        }, 1500);
      });
      
      resultsContainer.appendChild(itemLink);
    });
  }
  
  function handleKeyboardNavigation(e) {
    const items = resultsContainer.querySelectorAll('.search-item');
    if (items.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
      updateSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      updateSelection(items);
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < items.length) {
        e.preventDefault();
        items[selectedIndex].click();
      }
    }
  }
  
  function updateSelection(items) {
    items.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add('active');
        item.style.backgroundColor = 'var(--bg-tertiary)';
        item.style.color = 'var(--text-primary)';
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        item.classList.remove('active');
        item.style.backgroundColor = '';
        item.style.color = '';
      }
    });
  }
}
